import { Card, CardContent } from "@/components/ui/card"
import { Target, Users, Award, Wrench } from "lucide-react"

export default function AboutSection() {
  const features = [
    {
      icon: Target,
      title: "Tầm nhìn",
      description: "Trở thành đơn vị hàng đầu trong lĩnh vực sản xuất và thi công hệ thống ống gió tại Việt Nam.",
    },
    {
      icon: Users,
      title: "Đội ngũ",
      description: "Đội ngũ kỹ sư và thợ thi công giàu kinh nghiệm, được đào tạo chuyên nghiệp.",
    },
    {
      icon: Award,
      title: "Chất lượng",
      description: "Cam kết cung cấp sản phẩm và dịch vụ đạt tiêu chuẩn quốc tế, bảo hành dài hạn.",
    },
    {
      icon: Wrench,
      title: "Dịch vụ",
      description: "Tư vấn thiết kế, sản xuất, thi công và bảo trì hệ thống ống gió trọn gói.",
    },
  ]

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-serif font-bold text-foreground mb-6">
            {"Về Công ty"} <span className="text-primary">{"Nghiệp Hưng"}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {
              "Công ty TNHH Nghiệp Hưng được thành lập với sứ mệnh mang đến những giải pháp hệ thống ống gió tối ưu, góp phần nâng cao chất lượng không khí và môi trường sống."
            }
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-serif font-bold text-foreground mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-card rounded-2xl p-8 lg:p-12 shadow-lg">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl lg:text-3xl font-serif font-bold text-foreground mb-6">
                {"Cam kết của chúng tôi"}
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <p className="text-muted-foreground">{"Sử dụng vật liệu chất lượng cao, đạt tiêu chuẩn quốc tế"}</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <p className="text-muted-foreground">{"Thi công đúng tiến độ, đảm bảo an toàn lao động"}</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <p className="text-muted-foreground">{"Hỗ trợ khách hàng 24/7, bảo hành và bảo trì định kỳ"}</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <p className="text-muted-foreground">{"Giá cả cạnh tranh, minh bạch trong báo giá"}</p>
                </div>
              </div>
            </div>
            <div>
              <img src="/duct-installation-team.png" alt="Đội ngũ chuyên nghiệp" className="rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
