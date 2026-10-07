"use client";
import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { HashLoader } from "react-spinners";
import { notifications } from "@mantine/notifications";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  EconomicIndicator,
  useEconomicIndicators,
  updateEconomicIndicator,
} from "@/services/economic-indicator/service";

type Draft = Record<string, Pick<EconomicIndicator, "value" | "note" | "noteEn">>;

export function IndicatorsForm() {
  const { user } = useUser();
  const { data, isLoading } = useEconomicIndicators();
  const [draft, setDraft] = useState<Draft>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data) {
      const initial: Draft = {};
      for (const ind of data) {
        initial[ind.key] = {
          value: ind.value,
          note: ind.note ?? "",
          noteEn: ind.noteEn ?? "",
        };
      }
      setDraft(initial);
    }
  }, [data]);

  const set = (
    key: string,
    field: keyof Pick<EconomicIndicator, "value" | "note" | "noteEn">,
    val: string
  ) => {
    setDraft((prev) => ({ ...prev, [key]: { ...prev[key], [field]: val } }));
  };

  const handleSave = async () => {
    if (!user || !data) return;
    setSaving(true);
    const results = await Promise.all(
      data.map((ind) =>
        updateEconomicIndicator(ind.key, draft[ind.key] ?? {}, user.sub as string)
      )
    );
    setSaving(false);
    if (results.every(Boolean)) {
      notifications.show({
        id: "indicators-save",
        autoClose: 5000,
        withCloseButton: false,
        title: "Indicadores actualizados",
        message: "Los indicadores económicos se han guardado correctamente.",
        color: "green",
        loading: false,
      });
    } else {
      notifications.show({
        id: "indicators-save",
        autoClose: 5000,
        withCloseButton: false,
        title: "Error",
        message: "Ha ocurrido un error al guardar los indicadores.",
        color: "red",
        loading: false,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex w-full justify-center py-20">
        <HashLoader />
      </div>
    );
  }

  const indicators = data ?? [];

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      {indicators.map((ind) => (
        <div
          key={ind.key}
          className="flex flex-col gap-4 rounded-xl border bg-white p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-gray-900">
              {ind.label}{" "}
              <span className="text-gray-400">/ {ind.labelEn}</span>
            </h3>
            <span className="rounded-full bg-blue-dark/10 px-2 py-0.5 text-xs font-medium uppercase text-blue-dark">
              {ind.key}
            </span>
          </div>
          <EstadoVigencia indicador={ind} />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={`val-${ind.key}`}>Valor</Label>
              <Input
                id={`val-${ind.key}`}
                value={draft[ind.key]?.value ?? ""}
                onChange={(e) => set(ind.key, "value", e.target.value)}
                placeholder="Ej: 59.50"
                className="h-11 rounded-xl"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={`note-${ind.key}`}>Nota (ES)</Label>
              <Textarea
                id={`note-${ind.key}`}
                value={draft[ind.key]?.note ?? ""}
                onChange={(e) => set(ind.key, "note", e.target.value)}
                placeholder="Nota en español..."
                rows={2}
                className="rounded-xl"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={`noteen-${ind.key}`}>Nota (EN)</Label>
              <Textarea
                id={`noteen-${ind.key}`}
                value={draft[ind.key]?.noteEn ?? ""}
                onChange={(e) => set(ind.key, "noteEn", e.target.value)}
                placeholder="Note in English..."
                rows={2}
                className="rounded-xl"
              />
            </div>
          </div>
        </div>
      ))}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-dark px-8 text-white hover:bg-blue-dark/90"
        >
          {saving ? <HashLoader size={16} /> : "Guardar cambios"}
        </Button>
      </div>
    </div>
  );
}

/* Dice si el valor sigue vigente. Vencido, el portal deja de mostrarlo, asi
   que conviene que quien administra lo vea aqui sin tener que adivinarlo. */
function EstadoVigencia({ indicador }: { indicador: any }) {
  const fecha = indicador.updated_At
    ? new Date(indicador.updated_At).toLocaleDateString("es-DO", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;
  const horas = indicador.maxAgeHours ?? 24;
  const vigencia = horas >= 168 ? "semanal" : horas >= 24 ? "diaria" : `${horas} h`;

  return (
    <div className="flex flex-wrap items-center gap-2 text-xs">
      {indicador.stale ? (
        <span className="rounded-full bg-amber-100 px-2 py-0.5 font-medium text-amber-800">
          Vencido — no se muestra en el portal
        </span>
      ) : (
        <span className="rounded-full bg-emerald-100 px-2 py-0.5 font-medium text-emerald-800">
          Vigente
        </span>
      )}
      <span className="text-gray-500">
        {fecha ? `Actualizado el ${fecha}` : "Nunca se ha cargado"} · vigencia{" "}
        {vigencia}
      </span>
    </div>
  );
}
