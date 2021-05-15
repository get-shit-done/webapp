import { useMutation, useQueryCache } from "react-query";
import { removeGroup } from "../../../api";
import { IGroup } from "../../../reducers/settings";

export function useRemoveGroup() {
  const queryCache = useQueryCache();

  return useMutation(removeGroup, {
    onMutate: group => {
      queryCache.cancelQueries("groups");
      const previousGroups = queryCache.getQueryData("groups");
      queryCache.setQueryData("groups", (oldQuery: IGroup[]) => oldQuery.filter(x => x._id !== group._id));

      return () => queryCache.setQueryData("groups", previousGroups);
    },
    onError: (err, group, rollback: () => void) => rollback(),
    onSettled: () => {
      queryCache.invalidateQueries("groups");
    },
  });
}
