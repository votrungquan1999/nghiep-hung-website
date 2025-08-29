"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import ProductGalleryDialog from "./product-gallery-dialog"

export default function ProductsSection() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const products = [
    {
      name: "Ống gió tròn",
      description:
        "Ống gió tròn chất lượng cao, phù hợp cho các hệ thống thông gió dân dụng và công nghiệp. Được sản xuất từ vật liệu cao cấp, đảm bảo độ bền và hiệu suất tối ưu.",
      image: "/round-air-ducts.png",
      images: ["/round-air-ducts.png", "/round-air-duct-installation.png", "/round-air-duct-factory.png"],
    },
    {
      name: "Ống gió vuông",
      description:
        "Ống gió vuông được sản xuất theo tiêu chuẩn, tối ưu cho không gian lắp đặt. Thiết kế vuông vắn giúp tiết kiệm không gian và dễ dàng lắp đặt trong các công trình.",
      image: "/square-air-ducts.png",
      images: ["/square-air-ducts.png", "/square-air-duct-system.png", "/square-air-duct-manufacturing.png"],
    },
    {
      name: "Phụ kiện ống gió",
      description:
        "Đầy đủ các loại phụ kiện: cút nối, van điều chỉnh, miệng thổi, miệng hút. Tất cả phụ kiện đều được kiểm tra chất lượng nghiêm ngặt trước khi xuất xưởng.",
      image: "/air-duct-accessories.png",
      images: ["/air-duct-accessories.png", "/air-duct-fittings.png", "/air-duct-valves.png"],
    },
    {
      name: "Hệ thống cách âm",
      description:
        "Giải pháp cách âm chuyên nghiệp cho hệ thống ống gió, giảm thiểu tiếng ồn. Sử dụng vật liệu cách âm cao cấp, đảm bảo môi trường yên tĩnh và thoải mái.",
      image: "/soundproof-air-duct.png",
      images: ["/soundproof-air-duct.png", "/soundproof-air-duct-installation.png", "/acoustic-air-duct-system.png"],
    },
    {
      name: "Ống gió mềm",
      description:
        "Ống gió mềm linh hoạt, dễ lắp đặt trong các không gian hẹp và phức tạp. Chất liệu mềm dẻo nhưng vẫn đảm bảo độ bền và khả năng chịu áp lực cao.",
      image: "/placeholder-tka3n.png",
      images: ["/placeholder-tka3n.png", "/flexible-air-duct-installation.png", "/flexible-air-duct-coil.png"],
    },
    {
      name: "Hệ thống lọc khí",
      description:
        "Hệ thống lọc khí hiện đại, đảm bảo chất lượng không khí trong nhà. Công nghệ lọc tiên tiến giúp loại bỏ bụi bẩn, vi khuẩn và các chất gây ô nhiễm.",
      image: "/placeholder-pt0v2.png",
      images: ["/placeholder-pt0v2.png", "/air-filtration-system.png", "/air-purifier-installation.png"],
    },
  ]

  const handleProductClick = (product: any) => {
    setSelectedProduct(product)
    setIsDialogOpen(true)
  }

  return (
    <section id="products" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-serif font-bold text-foreground mb-6">
            {"Sản phẩm &"} <span className="text-primary">{"Dịch vụ"}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {"Chúng tôi cung cấp đa dạng các sản phẩm và dịch vụ hệ thống ống gió, đáp ứng mọi nhu cầu của khách hàng."}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 py-0 hover:-translate-y-1 cursor-pointer"
              onClick={() => handleProductClick(product)}
            >
              <div className="aspect-video overflow-hidden rounded-t-lg px-0">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-serif font-bold text-foreground">{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 leading-relaxed">{product.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="text-lg px-8">
            {"Xem tất cả sản phẩm"}
          </Button>
        </div>
      </div>

      {selectedProduct && (
        <ProductGalleryDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} product={selectedProduct} />
      )}
    </section>
  )
}
