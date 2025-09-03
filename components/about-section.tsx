import { Target, Users, Award, Wrench } from "lucide-react"
import FeatureCard from "./feature-card.ui"

/**
 * About section component that displays company overview with interactive feature cards
 * Each feature card opens a dialog when clicked to show detailed description
 */
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
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
