"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type {
  Actividad,
  CategoriaDoc,
  CategoriaTicket,
  Cliente,
  EstadoCliente,
  EstadoTicket,
  Factura,
  MensajeChat,
  ModalidadReunion,
  PortalState,
  Proyecto,
  PrioridadTicket,
  Respuesta,
  Reunion,
  Rol,
  Ticket,
  TipoActividad,
  Usuario,
} from "./types";
import {
  formatCLP,
  formatFecha,
  loadState,
  newId,
  resetState,
  saveState,
} from "./store";
import { generarPDF, type Bloque } from "./pdf";

const CATEGORIA_LABEL: Record<string, string> = {
  contrato: "Contrato",
  welcome_doc: "Welcome doc",
  estrategia: "Estrategia",
  reporte: "Reporte",
  otro: "Otro",
};

const SESSION_KEY = "koi-portal-session";

type NuevoDoc = {
  nombre: string;
  categoria: CategoriaDoc;
  tamano: string;
  descripcion?: string;
};

type NuevaFactura = {
  numero: string;
  concepto: string;
  monto: number;
  fechaVencimiento: string;
};

interface PortalContextValue {
  ready: boolean;
  user: Usuario | null;
  cliente: Cliente | null; // cliente asociado si el user es rol cliente
  state: PortalState;
  // auth
  login: (email: string, password: string) => Usuario | null;
  logout: () => void;
  // acciones
  subirDocumento: (
    clienteId: string,
    doc: NuevoDoc,
    subidoPor: "KOI" | "cliente"
  ) => void;
  descargarDocumento: (docId: string) => void;
  descargarFactura: (facturaId: string) => void;
  agregarFactura: (clienteId: string, f: NuevaFactura) => void;
  marcarFacturaPagada: (facturaId: string) => void;
  guardarFormulario: (clienteId: string, respuestas: Respuesta[]) => void;
  actualizarProyecto: (
    clienteId: string,
    patch: { faseActual?: string; progreso?: number; estadoLabel?: string }
  ) => void;
  agregarNota: (clienteId: string, texto: string) => void;
  pagarFactura: (facturaId: string) => void;
  crearTicket: (
    clienteId: string,
    t: {
      asunto: string;
      categoria: CategoriaTicket;
      prioridad: PrioridadTicket;
      descripcion: string;
    }
  ) => void;
  responderTicket: (ticketId: string, texto: string) => void;
  cambiarEstadoTicket: (ticketId: string, estado: EstadoTicket) => void;
  agendarReunion: (
    clienteId: string,
    r: { motivo: string; fecha: string; modalidad: ModalidadReunion }
  ) => void;
  confirmarReunion: (reunionId: string) => void;
  cancelarReunion: (reunionId: string) => void;
  crearCliente: (data: {
    nombreEmpresa: string;
    rut: string;
    contactoPrincipal: string;
    email: string;
    telefono: string;
    estado: EstadoCliente;
    password: string;
    proyectoNombre?: string;
  }) => Cliente;
  enviarMensaje: (clienteId: string, texto: string) => void;
  actualizarPerfil: (patch: {
    contactoPrincipal?: string;
    telefono?: string;
  }) => void;
  cambiarPassword: (nueva: string) => void;
  reset: () => void;
}

const PortalContext = createContext<PortalContextValue | null>(null);

export function PortalProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [state, setState] = useState<PortalState>(() => loadState());
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    setState(loadState());
    try {
      setUserId(window.localStorage.getItem(SESSION_KEY));
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const commit = useCallback((next: PortalState) => {
    saveState(next);
    setState(next);
  }, []);

  const user = useMemo(
    () => state.usuarios.find((u) => u.id === userId) ?? null,
    [state.usuarios, userId]
  );

  const cliente = useMemo(
    () =>
      user?.clienteId
        ? state.clientes.find((c) => c.id === user.clienteId) ?? null
        : null,
    [user, state.clientes]
  );

  // ---- log de actividad (helper interno) ------------------------------
  const registrar = useCallback(
    (
      base: PortalState,
      clienteId: string,
      tipo: TipoActividad,
      detalle: string,
      actor: string,
      rol: Rol
    ): PortalState => {
      const act: Actividad = {
        id: newId("a"),
        clienteId,
        actor,
        rol,
        tipo,
        detalle,
        fecha: new Date().toISOString(),
      };
      return { ...base, actividad: [act, ...base.actividad] };
    },
    []
  );

  // ---- auth -----------------------------------------------------------
  const login = useCallback(
    (email: string, password: string): Usuario | null => {
      const found = state.usuarios.find(
        (u) =>
          u.email.toLowerCase() === email.trim().toLowerCase() &&
          u.password === password
      );
      if (!found) return null;
      try {
        window.localStorage.setItem(SESSION_KEY, found.id);
      } catch {
        /* ignore */
      }
      setUserId(found.id);
      if (found.clienteId) {
        commit(
          registrar(
            state,
            found.clienteId,
            "login",
            "Inició sesión en el portal",
            found.nombre,
            found.rol
          )
        );
      }
      return found;
    },
    [state, commit, registrar]
  );

  const logout = useCallback(() => {
    try {
      window.localStorage.removeItem(SESSION_KEY);
    } catch {
      /* ignore */
    }
    setUserId(null);
  }, []);

  // ---- documentos -----------------------------------------------------
  const subirDocumento = useCallback(
    (clienteId: string, doc: NuevoDoc, subidoPor: "KOI" | "cliente") => {
      if (!user) return;
      let next: PortalState = {
        ...state,
        documentos: [
          {
            id: newId("d"),
            clienteId,
            nombre: doc.nombre,
            categoria: doc.categoria,
            subidoPor,
            tamano: doc.tamano,
            fechaSubida: new Date().toISOString(),
            descripcion: doc.descripcion,
          },
          ...state.documentos,
        ],
      };
      next = registrar(
        next,
        clienteId,
        "subida",
        `Subió «${doc.nombre}»`,
        user.nombre,
        user.rol
      );
      commit(next);
    },
    [state, user, commit, registrar]
  );

  const descargarDocumento = useCallback(
    (docId: string) => {
      if (!user) return;
      const doc = state.documentos.find((d) => d.id === docId);
      if (!doc) return;
      const nombreBase = doc.nombre.replace(/\.[^.]+$/, "");
      const bloques: Bloque[] = [
        { tipo: "h2", texto: `Categoría: ${CATEGORIA_LABEL[doc.categoria] ?? doc.categoria}` },
        { tipo: "p", texto: `Subido por: ${doc.subidoPor}` },
        { tipo: "p", texto: `Fecha: ${formatFecha(doc.fechaSubida)}` },
        { tipo: "divider" },
        {
          tipo: "p",
          texto:
            doc.descripcion ??
            "Documento del proyecto disponible en el portal de cliente.",
        },
        { tipo: "space", alto: 10 },
        { tipo: "p", texto: "(Documento de demostración generado por el portal KOI.)" },
      ];
      void generarPDF(nombreBase, nombreBase, bloques);
      commit(
        registrar(
          state,
          doc.clienteId,
          "descarga",
          `Descargó «${doc.nombre}»`,
          user.nombre,
          user.rol
        )
      );
    },
    [state, user, commit, registrar]
  );

  // ---- facturas -------------------------------------------------------
  const descargarFactura = useCallback(
    (facturaId: string) => {
      if (!user) return;
      const f = state.facturas.find((x) => x.id === facturaId);
      if (!f) return;
      const c = state.clientes.find((x) => x.id === f.clienteId);
      const bloques: Bloque[] = [
        { tipo: "h1", texto: `Factura N° ${f.numero}` },
        { tipo: "p", texto: `Cliente: ${c?.nombreEmpresa ?? ""}` },
        { tipo: "p", texto: `RUT: ${c?.rut ?? ""}` },
        { tipo: "divider" },
        { tipo: "p", texto: `Concepto: ${f.concepto}` },
        { tipo: "h2", texto: `Monto: ${formatCLP(f.monto)}` },
        { tipo: "p", texto: `Estado: ${f.estado}` },
        { tipo: "p", texto: `Emisión: ${formatFecha(f.fechaEmision)}` },
        { tipo: "p", texto: `Vencimiento: ${formatFecha(f.fechaVencimiento)}` },
        { tipo: "space", alto: 12 },
        { tipo: "p", texto: "Documento de demostración generado por el portal KOI." },
      ];
      void generarPDF(`Factura-${f.numero}`, `Factura N° ${f.numero}`, bloques);
      commit(
        registrar(
          state,
          f.clienteId,
          "descarga",
          `Descargó la factura N° ${f.numero}`,
          user.nombre,
          user.rol
        )
      );
    },
    [state, user, commit, registrar]
  );

  const agregarFactura = useCallback(
    (clienteId: string, f: NuevaFactura) => {
      if (!user) return;
      const factura: Factura = {
        id: newId("f"),
        clienteId,
        numero: f.numero,
        concepto: f.concepto,
        monto: f.monto,
        estado: "pendiente",
        fechaEmision: new Date().toISOString(),
        fechaVencimiento: f.fechaVencimiento,
      };
      let next: PortalState = { ...state, facturas: [factura, ...state.facturas] };
      next = registrar(
        next,
        clienteId,
        "factura",
        `Emitió la factura N° ${f.numero} (${formatCLP(f.monto)})`,
        user.nombre,
        user.rol
      );
      commit(next);
    },
    [state, user, commit, registrar]
  );

  const marcarFacturaPagada = useCallback(
    (facturaId: string) => {
      if (!user) return;
      const f = state.facturas.find((x) => x.id === facturaId);
      if (!f) return;
      let next: PortalState = {
        ...state,
        facturas: state.facturas.map((x) =>
          x.id === facturaId ? { ...x, estado: "pagada" as const } : x
        ),
      };
      next = registrar(
        next,
        f.clienteId,
        "factura",
        `Marcó como pagada la factura N° ${f.numero}`,
        user.nombre,
        user.rol
      );
      commit(next);
    },
    [state, user, commit, registrar]
  );

  // ---- formulario -----------------------------------------------------
  const guardarFormulario = useCallback(
    (clienteId: string, respuestas: Respuesta[]) => {
      if (!user) return;
      const existe = state.formularios.some((f) => f.clienteId === clienteId);
      const registro = {
        clienteId,
        respuestas,
        enviado: true,
        fechaRespuesta: new Date().toISOString(),
      };
      let next: PortalState = {
        ...state,
        formularios: existe
          ? state.formularios.map((f) =>
              f.clienteId === clienteId ? registro : f
            )
          : [...state.formularios, registro],
      };
      next = registrar(
        next,
        clienteId,
        "formulario",
        "Completó el formulario de onboarding",
        user.nombre,
        user.rol
      );
      commit(next);
    },
    [state, user, commit, registrar]
  );

  // ---- proyecto -------------------------------------------------------
  const actualizarProyecto = useCallback(
    (
      clienteId: string,
      patch: { faseActual?: string; progreso?: number }
    ) => {
      if (!user) return;
      let next: PortalState = {
        ...state,
        proyectos: state.proyectos.map((p) =>
          p.clienteId === clienteId
            ? {
                ...p,
                faseActual: (patch.faseActual as never) ?? p.faseActual,
                progreso: patch.progreso ?? p.progreso,
              }
            : p
        ),
      };
      next = registrar(
        next,
        clienteId,
        "estado",
        `Actualizó el proyecto${
          patch.faseActual ? ` a fase «${patch.faseActual}»` : ""
        }`,
        user.nombre,
        user.rol
      );
      commit(next);
    },
    [state, user, commit, registrar]
  );

  // ---- notas ----------------------------------------------------------
  const agregarNota = useCallback(
    (clienteId: string, texto: string) => {
      if (!user) return;
      let next: PortalState = {
        ...state,
        notas: [
          {
            id: newId("n"),
            clienteId,
            autor: user.nombre,
            texto,
            fecha: new Date().toISOString(),
          },
          ...state.notas,
        ],
      };
      next = registrar(
        next,
        clienteId,
        "nota",
        "Agregó una nota interna",
        user.nombre,
        user.rol
      );
      commit(next);
    },
    [state, user, commit, registrar]
  );

  // ---- pago de factura (checkout simulado) ----------------------------
  const pagarFactura = useCallback(
    (facturaId: string) => {
      if (!user) return;
      const f = state.facturas.find((x) => x.id === facturaId);
      if (!f) return;
      let next: PortalState = {
        ...state,
        facturas: state.facturas.map((x) =>
          x.id === facturaId ? { ...x, estado: "pagada" as const } : x
        ),
      };
      next = registrar(
        next,
        f.clienteId,
        "pago",
        `Pagó la factura N° ${f.numero} (${formatCLP(f.monto)})`,
        user.nombre,
        user.rol
      );
      commit(next);
    },
    [state, user, commit, registrar]
  );

  // ---- tickets de soporte ---------------------------------------------
  const crearTicket = useCallback(
    (
      clienteId: string,
      t: {
        asunto: string;
        categoria: CategoriaTicket;
        prioridad: PrioridadTicket;
        descripcion: string;
      }
    ) => {
      if (!user) return;
      const codigo = `TK-${String(state.tickets.length + 17).padStart(3, "0")}`;
      const ahora = new Date().toISOString();
      const ticket: Ticket = {
        id: newId("t"),
        clienteId,
        codigo,
        asunto: t.asunto,
        categoria: t.categoria,
        prioridad: t.prioridad,
        estado: "abierto",
        fechaCreacion: ahora,
        mensajes: [
          {
            id: newId("m"),
            autor: user.nombre,
            rol: user.rol,
            texto: t.descripcion,
            fecha: ahora,
          },
        ],
      };
      let next: PortalState = { ...state, tickets: [ticket, ...state.tickets] };
      next = registrar(
        next,
        clienteId,
        "ticket",
        `Abrió el ticket ${codigo}: «${t.asunto}»`,
        user.nombre,
        user.rol
      );
      commit(next);
    },
    [state, user, commit, registrar]
  );

  const responderTicket = useCallback(
    (ticketId: string, texto: string) => {
      if (!user) return;
      const tk = state.tickets.find((x) => x.id === ticketId);
      if (!tk) return;
      let next: PortalState = {
        ...state,
        tickets: state.tickets.map((x) =>
          x.id === ticketId
            ? {
                ...x,
                estado: x.estado === "resuelto" ? x.estado : "en_proceso",
                mensajes: [
                  ...x.mensajes,
                  {
                    id: newId("m"),
                    autor: user.nombre,
                    rol: user.rol,
                    texto,
                    fecha: new Date().toISOString(),
                  },
                ],
              }
            : x
        ),
      };
      next = registrar(
        next,
        tk.clienteId,
        "ticket",
        `Respondió el ticket ${tk.codigo}`,
        user.nombre,
        user.rol
      );
      commit(next);
    },
    [state, user, commit, registrar]
  );

  const cambiarEstadoTicket = useCallback(
    (ticketId: string, estado: EstadoTicket) => {
      if (!user) return;
      const tk = state.tickets.find((x) => x.id === ticketId);
      if (!tk) return;
      let next: PortalState = {
        ...state,
        tickets: state.tickets.map((x) =>
          x.id === ticketId ? { ...x, estado } : x
        ),
      };
      next = registrar(
        next,
        tk.clienteId,
        "ticket",
        `Marcó el ticket ${tk.codigo} como «${estado.replace("_", " ")}»`,
        user.nombre,
        user.rol
      );
      commit(next);
    },
    [state, user, commit, registrar]
  );

  // ---- reuniones ------------------------------------------------------
  const agendarReunion = useCallback(
    (
      clienteId: string,
      r: { motivo: string; fecha: string; modalidad: ModalidadReunion }
    ) => {
      if (!user) return;
      // Si la agenda KOI, queda confirmada; si la pide el cliente, solicitada.
      const estado = user.rol === "admin_koi" ? "confirmada" : "solicitada";
      const reunion: Reunion = {
        id: newId("r"),
        clienteId,
        motivo: r.motivo,
        fecha: r.fecha,
        modalidad: r.modalidad,
        estado,
        solicitadaPor: user.nombre,
      };
      let next: PortalState = {
        ...state,
        reuniones: [reunion, ...state.reuniones],
      };
      next = registrar(
        next,
        clienteId,
        "reunion",
        `Agendó una reunión: «${r.motivo}»`,
        user.nombre,
        user.rol
      );
      commit(next);
    },
    [state, user, commit, registrar]
  );

  const confirmarReunion = useCallback(
    (reunionId: string) => {
      if (!user) return;
      const rm = state.reuniones.find((x) => x.id === reunionId);
      if (!rm) return;
      let next: PortalState = {
        ...state,
        reuniones: state.reuniones.map((x) =>
          x.id === reunionId ? { ...x, estado: "confirmada" as const } : x
        ),
      };
      next = registrar(
        next,
        rm.clienteId,
        "reunion",
        `Confirmó la reunión del ${formatFecha(rm.fecha)}`,
        user.nombre,
        user.rol
      );
      commit(next);
    },
    [state, user, commit, registrar]
  );

  const cancelarReunion = useCallback(
    (reunionId: string) => {
      if (!user) return;
      const rm = state.reuniones.find((x) => x.id === reunionId);
      if (!rm) return;
      let next: PortalState = {
        ...state,
        reuniones: state.reuniones.map((x) =>
          x.id === reunionId ? { ...x, estado: "cancelada" as const } : x
        ),
      };
      next = registrar(
        next,
        rm.clienteId,
        "reunion",
        `Canceló la reunión del ${formatFecha(rm.fecha)}`,
        user.nombre,
        user.rol
      );
      commit(next);
    },
    [state, user, commit, registrar]
  );

  // ---- alta de cliente ------------------------------------------------
  const crearCliente = useCallback(
    (data: {
      nombreEmpresa: string;
      rut: string;
      contactoPrincipal: string;
      email: string;
      telefono: string;
      estado: EstadoCliente;
      password: string;
      proyectoNombre?: string;
    }): Cliente => {
      const ahora = new Date().toISOString();
      const cliente: Cliente = {
        id: newId("c"),
        nombreEmpresa: data.nombreEmpresa,
        rut: data.rut,
        contactoPrincipal: data.contactoPrincipal,
        email: data.email,
        telefono: data.telefono,
        estado: data.estado,
        fechaInicio: ahora,
      };
      const usuario = {
        id: newId("u"),
        clienteId: cliente.id,
        rol: "cliente" as const,
        nombre: data.contactoPrincipal,
        email: data.email,
        password: data.password,
      };
      let next: PortalState = {
        ...state,
        clientes: [...state.clientes, cliente],
        usuarios: [...state.usuarios, usuario],
        formularios: [
          ...state.formularios,
          { clienteId: cliente.id, respuestas: [], enviado: false, fechaRespuesta: null },
        ],
      };
      if (data.proyectoNombre?.trim()) {
        const proyecto: Proyecto = {
          clienteId: cliente.id,
          nombre: data.proyectoNombre.trim(),
          faseActual: "Contrato",
          progreso: 0,
          fechaEstimadaEntrega: new Date(Date.now() + 90 * 864e5).toISOString(),
          resumen: "",
        };
        next = { ...next, proyectos: [...next.proyectos, proyecto] };
      }
      next = registrar(
        next,
        cliente.id,
        "estado",
        `Se creó el cliente «${cliente.nombreEmpresa}»`,
        user?.nombre ?? "KOI",
        "admin_koi"
      );
      commit(next);
      return cliente;
    },
    [state, user, commit, registrar]
  );

  // ---- mensajería directa ---------------------------------------------
  const enviarMensaje = useCallback(
    (clienteId: string, texto: string) => {
      if (!user) return;
      const msg: MensajeChat = {
        id: newId("msg"),
        clienteId,
        autor: user.nombre,
        rol: user.rol,
        texto,
        fecha: new Date().toISOString(),
      };
      let next: PortalState = { ...state, mensajes: [...state.mensajes, msg] };
      next = registrar(
        next,
        clienteId,
        "mensaje",
        "Envió un mensaje",
        user.nombre,
        user.rol
      );
      commit(next);
    },
    [state, user, commit, registrar]
  );

  // ---- perfil ---------------------------------------------------------
  const actualizarPerfil = useCallback(
    (patch: { contactoPrincipal?: string; telefono?: string }) => {
      if (!user) return;
      const next: PortalState = {
        ...state,
        clientes: user.clienteId
          ? state.clientes.map((c) =>
              c.id === user.clienteId
                ? {
                    ...c,
                    contactoPrincipal:
                      patch.contactoPrincipal?.trim() || c.contactoPrincipal,
                    telefono: patch.telefono?.trim() || c.telefono,
                  }
                : c
            )
          : state.clientes,
        usuarios: state.usuarios.map((u) =>
          u.id === user.id
            ? { ...u, nombre: patch.contactoPrincipal?.trim() || u.nombre }
            : u
        ),
      };
      commit(next);
    },
    [state, user, commit]
  );

  const cambiarPassword = useCallback(
    (nueva: string) => {
      if (!user) return;
      const next: PortalState = {
        ...state,
        usuarios: state.usuarios.map((u) =>
          u.id === user.id ? { ...u, password: nueva } : u
        ),
      };
      commit(next);
    },
    [state, user, commit]
  );

  const reset = useCallback(() => {
    commit(resetState());
  }, [commit]);

  const value: PortalContextValue = {
    ready,
    user,
    cliente,
    state,
    login,
    logout,
    subirDocumento,
    descargarDocumento,
    descargarFactura,
    agregarFactura,
    marcarFacturaPagada,
    guardarFormulario,
    actualizarProyecto,
    agregarNota,
    pagarFactura,
    crearTicket,
    responderTicket,
    cambiarEstadoTicket,
    agendarReunion,
    confirmarReunion,
    cancelarReunion,
    crearCliente,
    enviarMensaje,
    actualizarPerfil,
    cambiarPassword,
    reset,
  };

  return (
    <PortalContext.Provider value={value}>{children}</PortalContext.Provider>
  );
}

export function usePortal(): PortalContextValue {
  const ctx = useContext(PortalContext);
  if (!ctx) throw new Error("usePortal debe usarse dentro de <PortalProvider>");
  return ctx;
}
