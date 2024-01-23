'use server'
import { currentUser } from '@clerk/nextjs';

export async function getUserId() {
  const user = await currentUser();
  return user ? user.id : "default-user"
}