## Using Layout Component

```tsx
<Layout title="New Page Title" breadcrumb={['Home', 'Stakings', 'Your New Page']}>
  <p>Child elements</p>
</Layout>
```

#### Note

The `title` and `breadcrumb` props are required.

#### More optional props

- **`subtitle`** Takes in a string
- **`transparent`** Booelan
- **`button`** takes an object

```ts
type LayoutProps = {
  title: string;
  subtitle?: string;
  transparent?: boolean;
  breadcrumb: string[];
  button?: {
    name: string;
    link?: string;
    className?: string;
    onClick?: (event: any) => void;
  };
};
```
