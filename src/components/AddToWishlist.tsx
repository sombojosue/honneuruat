import { urlAppApi } from "./Variables";

export const addToWishlist = async (itemId: string, userId: string) => {
  const response = await fetch(`${urlAppApi}productwhiteinsert.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      item_id: itemId,
      user_id: userId,
    }),
  });

  const result = await response.json();
  return result;
};
