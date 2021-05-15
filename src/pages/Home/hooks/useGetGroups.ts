import { useQuery } from "react-query";
import { getGroups } from "../../../api";
import { IGroup } from "../../../reducers/settings";

export function useGetGroups() {
  return useQuery<IGroup[], Error>("groups", getGroups);
}
