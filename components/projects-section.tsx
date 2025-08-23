"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Building } from "lucide-react"

export default function ProjectsSection() {
  const projects = [
    {
      id: 1,
      name: "Trung tâm thương mại Vincom",
      category: "Thương mại",
      location: "TP. Hồ Chí Minh",
      year: "2023",
      description:
        "Thi công hệ thống ống gió cho trung tâm thương mại với diện tích 50,000m², bao gồm hệ thống thông gió, điều hòa không khí và xử lý khói.",
      mainImage: "/modern-mall-air-ducts.png",
      images: [
        "/shopping-mall-ducts.png",
        "/placeholder-953i4.png",
        "/mall-ventilation-installation.png",
        "/commercial-duct-work-completion.png",
      ],
      specs: [
        "Diện tích: 50,000m²",
        "Thời gian thi công: 6 tháng",
        "Loại ống gió: Tròn và vuông",
        "Hệ thống: Thông gió + Điều hòa",
      ],
    },
    {
      id: 2,
      name: "Nhà máy sản xuất Samsung",
      category: "Công nghiệp",
      location: "Bắc Ninh",
      year: "2023",
      description:
        "Lắp đặt hệ thống ống gió công nghiệp cho nhà máy điện tử, đảm bảo môi trường sản xuất sạch và kiểm soát nhiệt độ chính xác.",
      mainImage: "/industrial-air-ducts.png",
      images: [
        "/factory-duct-installation.png",
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
      ],
      specs: [
        "Diện tích: 80,000m²",
        "Thời gian thi công: 8 tháng",
        "Tiêu chuẩn: Clean room Class 1000",
        "Hệ thống: Lọc khí + Kiểm soát nhiệt độ",
      ],
    },
    {
      id: 3,
      name: "Bệnh viện Đa khoa Quốc tế",
      category: "Y tế",
      location: "Hà Nội",
      year: "2022",
      description: "Thi công hệ thống ống gió cho bệnh viện với yêu cầu khắt khe về vệ sinh và kiểm soát nhiễm khuẩn.",
      mainImage: "/placeholder.svg?height=400&width=600",
      images: [
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
      ],
      specs: [
        "Diện tích: 30,000m²",
        "Thời gian thi công: 5 tháng",
        "Tiêu chuẩn: Y tế quốc tế",
        "Hệ thống: Áp suất âm/dương",
      ],
    },
    {
      id: 4,
      name: "Khu căn hộ cao cấp Landmark",
      category: "Dân dụng",
      location: "TP. Hồ Chí Minh",
      year: "2022",
      description: "Lắp đặt hệ thống ống gió cho 500 căn hộ cao cấp, tối ưu hóa không gian và hiệu quả năng lượng.",
      mainImage: "/placeholder.svg?height=400&width=600",
      images: [
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
      ],
      specs: [
        "Số căn hộ: 500 căn",
        "Thời gian thi công: 12 tháng",
        "Loại ống gió: Mềm + Cứng",
        "Hệ thống: VRV + Fresh Air",
      ],
    },
    {
      id: 5,
      name: "Khách sạn 5 sao InterContinental",
      category: "Khách sạn",
      location: "Đà Nẵng",
      year: "2021",
      description:
        "Thi công hệ thống ống gió cho khách sạn 5 sao với 300 phòng, đảm bảo tiêu chuẩn quốc tế về chất lượng không khí.",
      mainImage: "/placeholder.svg?height=400&width=600",
      images: [
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
      ],
      specs: [
        "Số phòng: 300 phòng",
        "Thời gian thi công: 10 tháng",
        "Tiêu chuẩn: 5 sao quốc tế",
        "Hệ thống: Trung tâm + Phân tán",
      ],
    },
    {
      id: 6,
      name: "Trường Đại học FPT",
      category: "Giáo dục",
      location: "Hà Nội",
      year: "2021",
      description:
        "Lắp đặt hệ thống thông gió cho khuôn viên đại học với nhiều tòa nhà và phòng thí nghiệm chuyên dụng.",
      mainImage: "/placeholder.svg?height=400&width=600",
      images: [
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
      ],
      specs: [
        "Diện tích: 40,000m²",
        "Thời gian thi công: 7 tháng",
        "Số tòa nhà: 8 tòa",
        "Hệ thống: Thông gió tự nhiên + Cơ khí",
      ],
    },
  ]

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-serif font-bold text-foreground mb-6">
            {"Dự án"} <span className="text-primary">{"Tiêu biểu"}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {"Khám phá những dự án đã hoàn thành của chúng tôi, từ các tòa nhà thương mại đến nhà máy công nghiệp."}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Dialog key={project.id}>
              <DialogTrigger asChild>
                <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 px-0 hover:-translate-y-1">
                  <div className="aspect-video overflow-hidden rounded-t-lg">
                    <img
                      src={project.mainImage || "/placeholder.svg"}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="secondary">{project.category}</Badge>
                      <span className="text-sm text-muted-foreground">{project.year}</span>
                    </div>
                    <h3 className="text-xl font-serif font-bold text-foreground mb-2">{project.name}</h3>
                    <div className="flex items-center text-sm text-muted-foreground mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      {project.location}
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">{project.description}</p>
                  </CardContent>
                </Card>
              </DialogTrigger>

              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-serif font-bold">{project.name}</DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center">
                      <Building className="h-4 w-4 mr-2 text-primary" />
                      <span>{project.category}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-primary" />
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-primary" />
                      <span>{project.year}</span>
                    </div>
                    <Badge variant="secondary" className="w-fit">
                      {"Hoàn thành"}
                    </Badge>
                  </div>

                  <div>
                    <h4 className="font-serif font-bold text-lg mb-3">{"Mô tả dự án"}</h4>
                    <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                  </div>

                  <div>
                    <h4 className="font-serif font-bold text-lg mb-3">{"Thông số kỹ thuật"}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {project.specs.map((spec, index) => (
                        <div key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-muted-foreground text-sm">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-serif font-bold text-lg mb-3">{"Hình ảnh dự án"}</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {project.images.map((image, index) => (
                        <div key={index} className="aspect-video overflow-hidden rounded-lg">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`${project.name} - Hình ${index + 1}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  )
}
