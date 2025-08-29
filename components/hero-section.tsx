import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"

export default function HeroSection() {
  return (
    <section id="home" className="relative bg-gradient-to-br from-background to-accent/20 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-6xl font-serif font-black text-foreground mb-6 leading-tight">
              {"Hệ thống ống gió"} <span className="text-primary">{"chuyên nghiệp"}</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {
                "Với hơn 10 năm kinh nghiệm, chúng tôi chuyên sản xuất và thi công các hệ thống ống gió chất lượng cao cho các dự án công nghiệp và dân dụng."
              }
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a href="/products" className="inline-block">
                <Button size="lg" className="text-lg px-8 w-full">
                  {"Xem sản phẩm"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <a href="/contact" className="inline-block">
                <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent w-full">
                  {"Liên hệ tư vấn"}
                </Button>
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-primary mr-2" />
                <span className="text-sm font-medium">{"Chất lượng cao"}</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-primary mr-2" />
                <span className="text-sm font-medium">{"Thi công nhanh"}</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-primary mr-2" />
                <span className="text-sm font-medium">{"Bảo hành dài hạn"}</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <img src="/placeholder-gtu1v.png" alt="Hệ thống ống gió chuyên nghiệp" className="rounded-lg shadow-2xl" />
            <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-lg shadow-lg">
              <div className="text-3xl font-bold">{"10+"}</div>
              <div className="text-sm">{"Năm kinh nghiệm"}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
