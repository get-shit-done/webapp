import { useMutation, useQueryCache } from "react-query";
import { updateGroup } from "../../../api";
import { IGroup } from "../../../reducers/settings";

export function useUpdateGroup() {
  const queryCache = useQueryCache();

  return useMutation(updateGroup, {
    onMutate: group => {
      queryCache.cancelQueries("groups");
      const previousGroups = queryCache.getQueryData("groups");
      queryCache.setQueryData("groups", (oldQuery: IGroup[]) =>
        oldQuery.map(query => {
          if (query._id !== group.groupId) return query;
          return {
            ...query,
            ...group,
          };
        })
      );

      return () => queryCache.setQueryData("groups", previousGroups);
    },
    onError: (err, group, rollback: () => void) => rollback(),
    onSettled: () => {
      queryCache.invalidateQueries("groups");
    },
  });
}
