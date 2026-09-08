import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import type { Event } from "../interfaces/event.interface";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
  defaultValues?: Event | null;
}

export const EventFormDialog = ({
  open,
  onOpenChange,
  onSubmit,
  defaultValues,
}: Props) => {

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    type: "General",
    max_attendees: "",
    event_date: "",
  });

  useEffect(() => {

    if (defaultValues) {

      const date = defaultValues.event_date
        ? new Date(defaultValues.event_date)
            .toISOString()
            .slice(0, 16)
        : "";

      setForm({
        title: defaultValues.title,
        description: defaultValues.description,
        location: defaultValues.location ?? "",
        type: defaultValues.type,
        max_attendees:
          defaultValues.max_attendees?.toString() ?? "",
        event_date: date,
      });

      return;
    }

    setForm({
      title: "",
      description: "",
      location: "",
      type: "General",
      max_attendees: "",
      event_date: "",
    });

  }, [defaultValues, open]);

  const handleSubmit = () => {

    onSubmit({
      ...form,
      max_attendees: form.max_attendees
        ? Number(form.max_attendees)
        : null,
    });

  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-w-2xl">

        <DialogHeader>
          <DialogTitle>
            {defaultValues
              ? "Editar Evento"
              : "Nuevo Evento"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4">

          <div className="space-y-2">
            <Label>Título</Label>
            <Input
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value,
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Descripción</Label>
            <Textarea
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">

            <div className="space-y-2">
              <Label>Ubicación</Label>
              <Input
                value={form.location}
                onChange={(e) =>
                  setForm({
                    ...form,
                    location: e.target.value,
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Tipo</Label>
              <Input
                value={form.type}
                onChange={(e) =>
                  setForm({
                    ...form,
                    type: e.target.value,
                  })
                }
              />
            </div>

          </div>

          <div className="grid grid-cols-2 gap-4">

            <div className="space-y-2">
              <Label>Capacidad Máxima</Label>
              <Input
                type="number"
                value={form.max_attendees}
                onChange={(e) =>
                  setForm({
                    ...form,
                    max_attendees: e.target.value,
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Fecha y Hora</Label>
              <Input
                type="datetime-local"
                value={form.event_date}
                onChange={(e) =>
                  setForm({
                    ...form,
                    event_date: e.target.value,
                  })
                }
              />
            </div>

          </div>

        </div>

        <DialogFooter>

          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </Button>

          <Button onClick={handleSubmit}>
            Guardar
          </Button>

        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
};