const MONDAY_API_URL = "https://api.monday.com/v2";

export async function fetchTasksData() {
  const allItems: any[] = [];
  let nextCursor: string | null = null;

  do {
    const query: any = `
      query {
        boards(ids: 1778992090) {
          items_page(limit: 100${
            nextCursor ? `, cursor: "${nextCursor}"` : ""
          }) {
            cursor
            items {
              id
              name
              column_values(ids: ["dropdown5"]) {
                id
                text
              }
              subitems {
                id
                name
                column_values(ids: "status") {
                  id
                  text
                }
              }
            }
          }
        }
      }
    `;

    const response = await fetch(MONDAY_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.NEXT_PUBLIC_MONDAY_API_KEY!,
      },
      body: JSON.stringify({ query }),
    });

    const result = await response.json();
    const itemsPage = result.data.boards[0].items_page;
    allItems.push(...itemsPage.items);
    nextCursor = itemsPage.cursor;
  } while (nextCursor);

  return allItems;
}
