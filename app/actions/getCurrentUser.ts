

import { userClient } from "../services/user.service";


export default async function getCurrentUser() {
  try {
    const currentUser = await userClient.me()

    if (!currentUser?.email) {
      return null;
    }

   

    if (!currentUser) {
      return null;
    }

    return {
      ...currentUser
    
     
    };
  } catch (error: any) {
    return null;
  }
}

