"use client"

import { useState } from "react"
import Button from "./ui/Button"
import { Card, CardContent } from "./ui/Card"
import Badge from "./ui/Badge"
import Input from "./ui/Input"
import { Search, ShoppingCart, Star, Plus, Minus, ChevronRight } from 'lucide-react'
//import Footer from "./footer"

interface ProductDetailPageProps {
  onAddToCart: () => void
  onBackToHome: () => void
  onLogin: () => void
}

export default function ProductDetailPage({ onAddToCart, onBackToHome, onLogin }: ProductDetailPageProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  const productImages = [
    "/placeholder.svg?height=400&width=300&text=ChatGPT+Book",
    "/placeholder.svg?height=400&width=300&text=Back+Cover"
  ]

  const similarProducts = [
    {
      title: "Mạc Tử",
      price: "141.980₫",
      rating: 4.8,
      image: "/placeholder.svg?height=150&width=120&text=Mac+Tu"
    },
    {
      title: "AI - Công Cụ Nâng Cao Hiệu Suất Làm Việc",
      price: "110.000₫",
      rating: 4.9,
      image: "/placeholder.svg?height=150&width=120&text=AI+Tool"
    },
    {
      title: "Combo 3 Cuốn Building A Second Brain",
      price: "213.400₫",
      rating: 4.7,
      image: "/placeholder.svg?height=150&width=120&text=Combo"
    },
    {
      title: "Chat GPT - Ứng Dụng Trí Tuệ Nhân Tạo",
      price: "113.162₫",
      rating: 4.6,
      image: "/placeholder.svg?height=150&width=120&text=ChatGPT"
    }
  ]

  const topDeals = [
    {
      title: "AI - Công Cụ Nâng Cao Hiệu Suất Làm Việc",
      price: "110.000₫",
      rating: 4.8,
      image: "/placeholder.svg?height=120&width=100&text=AI"
    },
    {
      title: "Storytelling With Data - Kể Chuyện Bằng Dữ Liệu",
      price: "232.800₫",
      rating: 4.9,
      image: "/placeholder.svg?height=120&width=100&text=Data"
    },
    {
      title: "AI 5.0 - NHÂN HÓA, DỮ LIỆU, HỆ SINH THÁI",
      price: "138.442₫",
      rating: 4.7,
      image: "/placeholder.svg?height=120&width=100&text=AI5.0"
    },
    {
      title: "Inbound Selling - Thay Đổi Phương Thức Bán Hàng",
      price: "111.000₫",
      rating: 4.6,
      image: "/placeholder.svg?height=120&width=100&text=Selling"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-100 p-3 text-center">
        <p className="text-green-700 text-sm">
          Freeship đơn từ 45k, giảm nhiều hơn cùng <span className="font-bold text-blue-600">FREESHIP XTRA</span>
        </p>
      </div>

      {/* Navigation Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 cursor-pointer" onClick={onBackToHome}>
                <div className="w-8 h-8 bg-blue-600 text-white rounded flex items-center justify-center font-bold">T</div>
                <span className="text-blue-600 font-bold">TIKI</span>
                <span className="text-gray-500 text-sm">Tốt & Nhanh</span>
              </div>
              
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input 
                    placeholder="Freeship đơn từ 45k"
                    className="pl-10 bg-gray-50 border-gray-200"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="text-gray-600">
                Tìm kiếm
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600">
                Trang chủ
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600" onClick={onLogin}>
                Tài khoản
              </Button>
              <div className="relative">
                <ShoppingCart className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600 mb-4">
          Trang chủ {'>'} Nhà Sách Tiki {'>'} Sách kinh tế {'>'} Chat GPT Thực Chiến
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Images */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <div className="mb-4">
                <img 
                  src={productImages[selectedImage] || "/placeholder.svg"} 
                  alt="Chat GPT Thực Chiến"
                  className="w-full h-96 object-cover rounded-lg border"
                />
              </div>
              <div className="flex gap-2">
                {productImages.map((image, index) => (
                  <img 
                    key={index}
                    src={image || "/placeholder.svg"} 
                    alt={`Product image ${index + 1}`}
                    className={`w-16 h-20 object-cover rounded border cursor-pointer ${
                      selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                    }`}
                    onClick={() => setSelectedImage(index)}
                  />
                ))}
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 text-blue-600 text-sm">
                  <span>👁️</span>
                  <span>Xem thêm Tóm tắt nội dung sách</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:col-span-1">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">
                  Tác giả: Đinh Dương, Phan Trần Hòa, Lý Thế Minh
                </p>
                <h1 className="text-2xl font-bold mb-2">Chat GPT Thực Chiến</h1>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">4.7</span>
                  </div>
                  <span className="text-gray-500">|</span>
                  <span className="text-gray-600 text-sm">Đã bán 1000+</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-red-600">110.000₫</span>
                  <span className="text-lg text-gray-500 line-through">140.000₫</span>
                  <Badge className="bg-red-100 text-red-600">-21%</Badge>
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-3">
                <h3 className="font-medium">Thông tin chi tiết</h3>
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <div className="text-gray-600">Bookcare</div>
                  <div>Có</div>
                  <div className="text-gray-600">Công ty phát hành</div>
                  <div>1980 Books</div>
                  <div className="text-gray-600">Ngày xuất bản</div>
                  <div>2024-07-01 00:00:00</div>
                  <div className="text-gray-600">Kích thước</div>
                  <div>13 x 20.5 cm</div>
                  <div className="text-gray-600">Dịch Giả</div>
                  <div>Huyền Trang</div>
                  <div className="text-gray-600">Loại bìa</div>
                  <div>Bìa mềm</div>
                  <div className="text-gray-600">Số trang</div>
                  <div>263</div>
                  <div className="text-gray-600">Nhà xuất bản</div>
                  <div>Nhà Xuất Bản Dân Trí</div>
                </div>
              </div>

              {/* Product Description */}
              <div className="space-y-3">
                <h3 className="font-medium">Mô tả sản phẩm</h3>
                <div className="text-sm text-gray-700 space-y-2">
                  <p>
                    Trong thời đại mà trí tuệ nhân tạo đang thay đổi cách chúng ta làm việc và sáng tạo, 
                    cuốn sách này sẽ giúp bạn hiểu rõ về ChatGPT và cách sử dụng công cụ AI trong thực tế.
                  </p>
                  <p>
                    Với những hướng dẫn chi tiết và ví dụ cụ thể, bạn sẽ học được cách tối ưu hóa việc sử dụng ChatGPT 
                    để nâng cao hiệu quả công việc và sáng tạo nội dung.
                  </p>
                  <Button variant="ghost" className="p-0 text-blue-600">
                    Xem thêm
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Purchase Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded flex items-center justify-center text-xs font-bold">T</div>
                    <span className="font-medium">Tiki Trading</span>
                    <Badge variant="secondary" className="text-xs">OFFICIAL</Badge>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Số Lượng</p>
                      <div className="flex items-center gap-3">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-12 text-center">{quantity}</span>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setQuantity(quantity + 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 mb-2">Tạm tính</p>
                      <p className="text-2xl font-bold text-red-600">110.000₫</p>
                    </div>

                    <div className="space-y-2">
                      <Button 
                        className="w-full bg-red-500 hover:bg-red-600 text-white"
                        onClick={onAddToCart}
                      >
                        Mua ngay
                      </Button>
                      <Button variant="outline" className="w-full text-blue-600 border-blue-600">
                        Thêm vào giỏ
                      </Button>
                      <Button variant="outline" className="w-full">
                        Mua trước trả sau
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Shopping Confidence */}
              <Card className="mt-4">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-3">An tâm mua sắm</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-blue-600">✓</span>
                      <span>Được đồng kiểm khi nhận hàng</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-blue-600">✓</span>
                      <span>Được hoàn tiền 200% nếu là hàng giả</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-blue-600">✓</span>
                      <span>Đổi trả miễn phí trong 30 ngày. Được đổi ý. Chi tiết</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-6">Sản phẩm tương tự</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {similarProducts.map((product, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-3">
                  <div className="mb-3">
                    <img 
                      src={product.image || "/placeholder.svg"} 
                      alt={product.title}
                      className="w-full h-40 object-cover rounded"
                    />
                  </div>
                  <h3 className="text-sm font-medium mb-2 line-clamp-2 h-10">{product.title}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-gray-600">{product.rating}</span>
                  </div>
                  <span className="font-bold text-red-600">{product.price}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Top Deals */}
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-6">Top Deals</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {topDeals.map((deal, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-3">
                  <div className="mb-3">
                    <img 
                      src={deal.image || "/placeholder.svg"} 
                      alt={deal.title}
                      className="w-full h-32 object-cover rounded"
                    />
                  </div>
                  <h3 className="text-sm font-medium mb-2 line-clamp-2 h-10">{deal.title}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-gray-600">{deal.rating}</span>
                  </div>
                  <span className="font-bold text-red-600">{deal.price}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
     {/* <Footer showOnMobile={false} /> */}
    </div>
  )
}
