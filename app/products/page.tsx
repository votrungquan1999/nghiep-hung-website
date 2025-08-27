"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import ContactDialog from "@/components/contact-dialog"
import { useEffect } from "react"

export default function ProductsPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const products = [
    {
      name: "Ống gió tròn",
      description: "Ống gió tròn chất lượng cao, phù hợp cho các hệ thống thông gió dân dụng và công nghiệp.",
      image: "/round-air-ducts.png",
    },
    {
      name: "Ống gió vuông",
      description: "Ống gió vuông được sản xuất theo tiêu chuẩn, tối ưu cho không gian lắp đặt.",
      image: "/square-air-ducts.png",
    },
    {
      name: "Phụ kiện ống gió",
      description: "Đầy đủ các loại phụ kiện: cút nối, van điều chỉnh, miệng thổi, miệng hút.",
      image: "/air-duct-accessories.png",
    },
    {
      name: "Hệ thống cách âm",
      description: "Giải pháp cách âm chuyên nghiệp cho hệ thống ống gió, giảm thiểu tiếng ồn.",
      image: "/soundproof-air-duct.png",
    },
    {
      name: "Ống gió mềm",
      description: "Ống gió mềm linh hoạt, dễ lắp đặt trong các không gian hẹp và phức tạp.",
      image: "/placeholder-tka3n.png",
    },
    {
      name: "Hệ thống lọc khí",
      description: "Hệ thống lọc khí hiện đại, đảm bảo chất lượng không khí trong nhà.",
      image: "/placeholder-pt0v2.png",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Products content */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-serif font-bold text-foreground mb-6">
              {"Sản phẩm &"} <span className="text-primary">{"Dịch vụ"}</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {
                "Chúng tôi cung cấp đa dạng các sản phẩm và dịch vụ hệ thống ống gió, đáp ứng mọi nhu cầu của khách hàng."
              }
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 py-0 hover:-translate-y-1">
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
            <ContactDialog>
              <Button size="lg" className="text-lg px-8">
                {"Liên hệ tư vấn"}
              </Button>
            </ContactDialog>
          </div>
        </div>
      </div>
    </div>
  )
}
