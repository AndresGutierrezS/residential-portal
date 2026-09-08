import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createEventAction,
  deleteEventAction,
  getEventsAction,
  updateEventAction,
} from "../actions/events.actions";

export const useEventsApi = () => {

  const queryClient = useQueryClient();

  const eventsQuery = useQuery({
    queryKey: ["events"],
    queryFn: getEventsAction,
  });

  const createMutation = useMutation({
    mutationFn: createEventAction,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      event,
    }: {
      id: number;
      event: any;
    }) => updateEventAction(id, event),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteEventAction,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
      });
    },
  });

  return {
    eventsQuery,
    createMutation,
    updateMutation,
    deleteMutation,
  };
};