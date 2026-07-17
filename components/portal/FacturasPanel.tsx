"use client";

import { useState } from "react";
import { usePortal } from "@/lib/portal/PortalProvider";
import { formatCLP, formatFecha } from "@/lib/portal/store";
import {
  Button,
  EmptyState,
  EstadoFacturaBadge,
  Field,
  Input,
  Modal,
} from "./ui";
import {
  CardIcon,
  DownloadIcon,
  InvoiceIcon,
  PlusIcon,
} from "@/components/icons";
import type { Factura } from "@/lib/portal/types";
import {
  formatearTarjeta,
  formatearVencimiento,
  soloDigitos,
  validarCVV,
  validarTarjeta,
  validarVencimiento,
} from "@/lib/portal/validaciones";

export default function FacturasPanel({
  clienteId,
  canManage = false,
  canPay = false,
}: {
  clienteId: string;
  canManage?: boolean;
  canPay?: boolean;
}) {
  const {
    state,
    descargarFactura,
    agregarFactura,
    marcarFacturaPagada,
    pagarFactura,
  } = usePortal();
  const [open, setOpen] = useState(false);
  const [numero, setNumero] = useState("");
  const [concepto, setConcepto] = useState("");
  const [monto, setMonto] = useState("");
  const [venc, setVenc] = useState("");
  const [emitTocado, setEmitTocado] = useState(false);

  const montoNum = parseInt(monto.replace(/\D/g, ""), 10) || 0;
  const errEmitNumero = !numero.trim() ? "Requerido" : "";
  const errEmitConcepto = !concepto.trim() ? "Requerido" : "";
  const errEmitMonto = montoNum <= 0 ? "Ingresa un monto válido" : "";
  const emitValido = !errEmitNumero && !errEmitConcepto && !errEmitMonto;
  // Pago
  const [pagando, setPagando] = useState<Factura | null>(null);
  const [procesando, setProcesando] = useState(false);
  const [card, setCard] = useState({ num: "", exp: "", cvv: "", nombre: "" });
  const [tocado, setTocado] = useState(false);

  const errNum = !validarTarjeta(card.num) ? "Número de tarjeta inválido" : "";
  const errExp = !validarVencimiento(card.exp)
    ? "Vencimiento inválido o expirado"
    : "";
  const errCvv = !validarCVV(card.cvv) ? "CVV inválido" : "";
  const errNombre = !card.nombre.trim() ? "Ingresa el nombre" : "";
  const pagoValido = !errNum && !errExp && !errCvv && !errNombre;

  const abrirPago = (f: Factura) => {
    setPagando(f);
    setTocado(false);
    setCard({ num: "", exp: "", cvv: "", nombre: "" });
  };

  const facturas = state.facturas.filter((f) => f.clienteId === clienteId);
  const total = facturas.reduce((a, f) => a + f.monto, 0);
  const pendiente = facturas
    .filter((f) => f.estado !== "pagada")
    .reduce((a, f) => a + f.monto, 0);

  const guardar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emitValido) {
      setEmitTocado(true);
      return;
    }
    agregarFactura(clienteId, {
      numero,
      concepto,
      monto: montoNum,
      fechaVencimiento: venc
        ? new Date(venc).toISOString()
        : new Date(Date.now() + 30 * 864e5).toISOString(),
    });
    setOpen(false);
    setEmitTocado(false);
    setNumero("");
    setConcepto("");
    setMonto("");
    setVenc("");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-6 text-sm">
          <div>
            <span className="block text-xs text-junco">Total facturado</span>
            <span className="font-display text-lg font-semibold text-niebla">
              {formatCLP(total)}
            </span>
          </div>
          <div>
            <span className="block text-xs text-junco">Por cobrar</span>
            <span className="font-display text-lg font-semibold text-koi-deep dark:text-koi-light">
              {formatCLP(pendiente)}
            </span>
          </div>
        </div>
        {canManage && (
          <Button
            variant="subtle"
            onClick={() => {
              setEmitTocado(false);
              setOpen(true);
            }}
          >
            <PlusIcon className="h-4 w-4" />
            Emitir factura
          </Button>
        )}
      </div>

      {facturas.length === 0 ? (
        <EmptyState
          icon={<InvoiceIcon className="h-8 w-8" />}
          title="Sin facturas"
          description="Aún no hay facturas emitidas para este cliente."
        />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-hair/10">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-hair/10 text-left font-mono text-xs uppercase tracking-wider text-junco">
                <th className="px-4 py-3 font-medium">N°</th>
                <th className="px-4 py-3 font-medium">Concepto</th>
                <th className="px-4 py-3 font-medium">Monto</th>
                <th className="px-4 py-3 font-medium">Vencimiento</th>
                <th className="px-4 py-3 font-medium">Estado</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-hair/10">
              {facturas.map((f) => (
                <tr key={f.id} className="bg-laguna/20 hover:bg-laguna/40">
                  <td className="px-4 py-3 font-mono text-junco">{f.numero}</td>
                  <td className="px-4 py-3 text-niebla">{f.concepto}</td>
                  <td className="px-4 py-3 font-medium text-niebla">
                    {formatCLP(f.monto)}
                  </td>
                  <td className="px-4 py-3 text-junco">
                    {formatFecha(f.fechaVencimiento)}
                  </td>
                  <td className="px-4 py-3">
                    <EstadoFacturaBadge estado={f.estado} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      {canPay && f.estado !== "pagada" && (
                        <button
                          onClick={() => abrirPago(f)}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-koi px-3 py-1.5 text-xs font-semibold text-[#0B1418] transition-colors hover:bg-koi-light"
                        >
                          <CardIcon className="h-3.5 w-3.5" />
                          Pagar
                        </button>
                      )}
                      {canManage && f.estado !== "pagada" && (
                        <button
                          onClick={() => marcarFacturaPagada(f.id)}
                          className="rounded-lg border border-vidrio px-2.5 py-1.5 text-xs font-medium text-junco transition-colors hover:border-emerald-500/50 hover:text-emerald-500"
                        >
                          Marcar pagada
                        </button>
                      )}
                      <button
                        onClick={() => descargarFactura(f.id)}
                        aria-label={`Descargar factura ${f.numero}`}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-vidrio text-junco transition-colors hover:border-indigo hover:text-niebla"
                      >
                        <DownloadIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title="Emitir factura">
        <form onSubmit={guardar} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="N° de factura" error={emitTocado ? errEmitNumero : ""}>
              <Input
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                placeholder="0010"
              />
            </Field>
            <Field
              label="Monto (CLP)"
              error={emitTocado ? errEmitMonto : ""}
              hint={montoNum > 0 ? formatCLP(montoNum) : undefined}
            >
              <Input
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                placeholder="900000"
                inputMode="numeric"
              />
            </Field>
          </div>
          <Field label="Concepto" error={emitTocado ? errEmitConcepto : ""}>
            <Input
              value={concepto}
              onChange={(e) => setConcepto(e.target.value)}
              placeholder="Hito 2 - Módulo de inventario"
            />
          </Field>
          <Field label="Vencimiento">
            <Input
              type="date"
              value={venc}
              onChange={(e) => setVenc(e.target.value)}
            />
          </Field>
          <div className="flex justify-end gap-2 pt-1">
            <Button variant="ghost" type="button" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">Emitir</Button>
          </div>
        </form>
      </Modal>

      {/* Modal de pago (checkout simulado) */}
      <Modal
        open={!!pagando}
        onClose={() => !procesando && setPagando(null)}
        title="Pagar factura"
      >
        {pagando && (
          <div className="space-y-5">
            <div className="rounded-xl border border-hair/10 bg-veil/[0.04] p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-junco">Factura N° {pagando.numero}</span>
                <span className="font-mono text-junco">{pagando.concepto}</span>
              </div>
              <div className="mt-2 font-display text-2xl font-semibold text-niebla">
                {formatCLP(pagando.monto)}
              </div>
            </div>

            <div className="space-y-3">
              <Field
                label="Nombre en la tarjeta"
                error={tocado ? errNombre : ""}
              >
                <Input
                  value={card.nombre}
                  onChange={(e) =>
                    setCard((c) => ({ ...c, nombre: e.target.value }))
                  }
                  placeholder="Como aparece en la tarjeta"
                  autoComplete="cc-name"
                />
              </Field>
              <Field label="Número de tarjeta" error={tocado ? errNum : ""}>
                <Input
                  value={card.num}
                  onChange={(e) =>
                    setCard((c) => ({
                      ...c,
                      num: formatearTarjeta(e.target.value),
                    }))
                  }
                  placeholder="4242 4242 4242 4242"
                  inputMode="numeric"
                  autoComplete="cc-number"
                />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Vencimiento" error={tocado ? errExp : ""}>
                  <Input
                    value={card.exp}
                    onChange={(e) =>
                      setCard((c) => ({
                        ...c,
                        exp: formatearVencimiento(e.target.value),
                      }))
                    }
                    placeholder="MM/AA"
                    inputMode="numeric"
                    autoComplete="cc-exp"
                  />
                </Field>
                <Field label="CVV" error={tocado ? errCvv : ""}>
                  <Input
                    value={card.cvv}
                    onChange={(e) =>
                      setCard((c) => ({
                        ...c,
                        cvv: soloDigitos(e.target.value).slice(0, 4),
                      }))
                    }
                    placeholder="123"
                    inputMode="numeric"
                    autoComplete="cc-csc"
                  />
                </Field>
              </div>
            </div>

            <p className="flex items-center gap-2 text-xs text-junco">
              <CardIcon className="h-4 w-4" />
              Pago de demostración — no se procesa ningún cobro real. Prueba con{" "}
              <span className="font-mono">4242 4242 4242 4242</span>.
            </p>

            <div className="flex justify-end gap-2">
              <Button
                variant="ghost"
                type="button"
                disabled={procesando}
                onClick={() => setPagando(null)}
              >
                Cancelar
              </Button>
              <Button
                type="button"
                disabled={procesando}
                onClick={() => {
                  if (!pagoValido) {
                    setTocado(true);
                    return;
                  }
                  setProcesando(true);
                  const id = pagando.id;
                  window.setTimeout(() => {
                    pagarFactura(id);
                    setProcesando(false);
                    setPagando(null);
                  }, 1100);
                }}
              >
                {procesando ? "Procesando…" : `Pagar ${formatCLP(pagando.monto)}`}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
