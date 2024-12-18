const BUSINESS_GRAPHQL_FIELDS = `
  name
  category
  streetAddress
  postalCode
  website
  image {
    url
  }
  description
`;

async function fetchGraphQL(query: string, preview = false): Promise<any> {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
      next: { tags: ["posts"] },
    },
  ).then((response) => response.json());
}

export async function getAllBusinesses(): Promise<any[]> {
  console.log("fetching businesses");

  const entries = await fetchGraphQL(
    `query {
      businessCollection(where: { name_exists: true }, order: name_ASC) {
        items {
          ${BUSINESS_GRAPHQL_FIELDS}
        }
      }
    }`
  );
  return entries?.data?.businessCollection?.items || [];
}
