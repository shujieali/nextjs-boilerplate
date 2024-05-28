import { Role } from "@/types/role";
import { SortEnum } from "@/types/sort-type";
import { User } from "@/types/user";

export type UserFilterType = {
  roles?: Role[];
};

export type UserSortType = {
  orderBy: keyof User;
  order: SortEnum;
};
