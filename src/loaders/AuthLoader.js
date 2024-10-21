import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { redirect } from "react-router-dom";
import { auth, db } from "~/firebase/firebase";

export const authLoader = (requiredRoles) => {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        resolve(redirect("/signin"));
      } else {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (requiredRoles.includes(userData.role)) {
            resolve(null);
          } else {
            resolve(redirect("/signin"));
          }
        } else {
          resolve(redirect("/signin"));
        }
      }
    });
  });
};
