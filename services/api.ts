
import { USER_LIST_API } from "../config/constant";

export async function fetchUsers() {
  const res = await fetch(`${USER_LIST_API}/users`);
  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }
  return res.json();
}
