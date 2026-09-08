import { portalGateApi } from "@/api/portalGateApi";
import type { Event } from "../interfaces/event.interface";

export const getEventsAction = async (): Promise<Event[]> => {

  const response = await portalGateApi.get<Event[]>("/events");

  return response.data;

};


export const createEventAction = async (
  payload: Partial<Event>
): Promise<Event> => {

  const response = await portalGateApi.post<Event>(
    "/events",
    payload
  );

  return response.data;

};


export const updateEventAction = async (
  id: number,
  payload: Partial<Event>
): Promise<Event> => {

  const response = await portalGateApi.put<Event>(
    `/events/${id}`,
    payload
  );

  return response.data;

};


export const deleteEventAction = async (
  id: number
): Promise<void> => {

  await portalGateApi.delete(
    `/events/${id}`
  );

};