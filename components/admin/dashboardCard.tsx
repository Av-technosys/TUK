// components/dashboard-cards.tsx
import { ShoppingCart, Package, Users, DollarSign } from "lucide-react"
import { StatCard } from "./statCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const recentProducts = [
  {
    id: "p_1001",
    name: "Premium Wireless Headphones",
    category: "Electronics",
    price: "₹2,499",
    stock: 18,
    status: "Active" as const,
    image:
      "https://images.unsplash.com/photo-1518441902117-f0a949b1b190?auto=format&fit=crop&w=200&q=60",
  },
  {
    id: "p_1002",
    name: "Minimal Leather Wallet",
    category: "Accessories",
    price: "₹899",
    stock: 42,
    status: "Active" as const,
    image:
      "https://images.unsplash.com/photo-1620799139834-6b8f844fbe61?auto=format&fit=crop&w=200&q=60",
  },
  {
    id: "p_1003",
    name: "Cotton Oversized T‑Shirt",
    category: "Fashion",
    price: "₹699",
    stock: 0,
    status: "Out of stock" as const,
    image:
      "https://images.unsplash.com/photo-1520975958225-39f056b0ffc0?auto=format&fit=crop&w=200&q=60",
  },
  {
    id: "p_1004",
    name: "Stainless Steel Bottle (1L)",
    category: "Home & Kitchen",
    price: "₹499",
    stock: 9,
    status: "Low stock" as const,
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=200&q=60",
  },
] as const

const recentCategories = [
  {
    id: "c_2001",
    name: "Electronics",
    items: 128,
    featured: true,
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=200&q=60",
  },
  {
    id: "c_2002",
    name: "Fashion",
    items: 74,
    featured: false,
    image:
      "https://images.unsplash.com/photo-1620799139834-6b8f844fbe61?auto=format&fit=crop&w=200&q=60",
  },
  {
    id: "c_2003",
    name: "Home & Kitchen",
    items: 56,
    featured: true,
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=200&q=60",
  },
  {
    id: "c_2004",
    name: "Accessories",
    items: 33,
    featured: false,
    image:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=200&q=60",
  },
] as const

export function DashboardCards() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Categories" 
        value="1,247" 
        subtitle="+8.5% from last week ↑" 
        subtitleVariant="positive"
        icon={<ShoppingCart className="text-sky-500" size={24} />}
        iconBg="bg-sky-100/50"
      />
      <StatCard 
        title="Total Products" 
        value="89" 
        subtitle="78 Active Products" 
        icon={<Package className="text-purple-500" size={24} />}
        iconBg="bg-purple-100/50"
      />
      <StatCard 
        title="Total Featured Products" 
        value="89" 
        subtitle="76 Active Products" 
        icon={<Users className="text-yellow-500" size={24} />}
        iconBg="bg-yellow-100/50"
      />
      <StatCard 
        title="Total Featured Categories" 
        value="$125" 
        subtitle="76 Active Products" 
        icon={<DollarSign className="text-emerald-500" size={24} />}
        iconBg="bg-emerald-100/50"
      />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-4">
      <Card className="border shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-0">
          <div className="flex items-center justify-between gap-3">
            <CardTitle>Recent Products</CardTitle>
            <Badge variant="secondary">{recentProducts.length} new</Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="mt-3 divide-y rounded-lg border bg-background">
            {recentProducts.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-3 p-3 hover:bg-muted/40 transition-colors"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-12 w-12 rounded-lg object-cover ring-1 ring-foreground/10"
                  loading="lazy"
                />

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <p className="truncate font-medium text-slate-900">
                      {p.name}
                    </p>
                    <p className="shrink-0 text-sm font-semibold text-slate-900">
                      {p.price}
                    </p>
                  </div>
                  <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span className="truncate">{p.category}</span>
                    <span className="text-muted-foreground/60">•</span>
                    <span>
                      Stock:{" "}
                      <span className="font-medium text-slate-700">
                        {p.stock}
                      </span>
                    </span>
                  </div>
                </div>

                <Badge
                  variant={
                    p.status === "Active"
                      ? "default"
                      : p.status === "Low stock"
                        ? "outline"
                        : "destructive"
                  }
                >
                  {p.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-0">
          <div className="flex items-center justify-between gap-3">
            <CardTitle>Recent Categories</CardTitle>
            <Badge variant="secondary">{recentCategories.length} updated</Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="mt-3 divide-y rounded-lg border bg-background">
            {recentCategories.map((c) => (
              <div
                key={c.id}
                className="flex items-center gap-3 p-3 hover:bg-muted/40 transition-colors"
              >
                <img
                  src={c.image}
                  alt={c.name}
                  className="h-12 w-12 rounded-lg object-cover ring-1 ring-foreground/10"
                  loading="lazy"
                />

                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-slate-900">{c.name}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {c.items} items
                  </p>
                </div>

                {c.featured ? (
                  <Badge variant="default">Featured</Badge>
                ) : (
                  <Badge variant="outline">Standard</Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}