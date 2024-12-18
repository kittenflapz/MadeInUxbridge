# Uxbridge Local Business Directory

This project is a directory of local businesses, products, and services in Uxbridge, Ontario. It leverages Next.js for static site generation and uses Contentful as a headless CMS to manage and deliver content.

## Features

- **Local Business Listings**: Discover a variety of businesses and services available in Uxbridge.
- **Contentful Integration**: Content is managed through Contentful, allowing for easy updates and scalability.
- **Responsive Design**: Optimized for viewing on all devices.

## How to Use

1. **Set Up Contentful**: Create an account and a space on Contentful. Define your content model to include business details such as name, category, address, and description.
2. **Configure Environment Variables**: Copy `.env.local.example` to `.env.local` and set your Contentful API keys.
3. **Run Locally**: Install dependencies and start the development server.
   ```bash
   yarn install
   yarn dev
   ```
   Access the site at [http://localhost:3000](http://localhost:3000).

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## License

This project is licensed under the MIT License.
