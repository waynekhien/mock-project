"use client"

import { useState } from "react"
import Button from "./ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card"
import Badge from "./ui/Badge"
import { Separator } from "./ui/Separator"
import { RadioGroup, RadioGroupItem } from "./ui/RadioGroup"
import { Label } from "@radix-ui/react-label"
import { Truck, CreditCard, Wallet } from 'lucide-react'

interface BuyProduct {
  onPlaceOrder: () => void
}

function BuyProduct({ onPlaceOrder }: BuyProduct) {
  const [selectedDelivery, setSelectedDelivery] = useState("fast")
  const [selectedPayment, setSelectedPayment] = useState("cash")

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Header */}
      <div className="bg-green-100 p-3 rounded-lg mb-6 text-center">
        <p className="text-green-700 text-sm">
          Freeship đơn từ 45k, giảm nhiều hơn cùng <span className="font-bold text-blue-600">FREESHIP XTRA</span>
        </p>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 text-white rounded flex items-center justify-center font-bold">T</div>
          <span className="text-blue-600 font-bold">TIKI</span>
          <span className="text-gray-500">Tốt & Nhanh</span>
        </div>
        <span className="text-blue-600 font-medium">Thanh toán</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Delivery Options */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Chọn hình thức giao hàng</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={selectedDelivery} onValueChange={setSelectedDelivery}>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 border rounded-lg bg-blue-50">
                    <RadioGroupItem value="fast" id="fast" />
                    <Label htmlFor="fast" className="flex-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="error" className="text-xs">NEW</Badge>
                        <span>Giao siêu tốc 2h</span>
                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">-5K</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Giao tiết kiệm -16K</p>
                    </Label>
                  </div>
                </div>
              </RadioGroup>

              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-green-600" />
                  <span className="text-sm">Đã: Giao siêu tốc 2h, trước 13h hôm nay</span>
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <div className="w-12 h-16 bg-gray-200 rounded flex items-center justify-center">
                    <span className="text-xs">IMG</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Chat GPT Thực Chiến</h4>
                    <p className="text-sm text-gray-600">SL: x1</p>
                    <p className="text-red-600 font-medium">110.000 ₫</p>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <Button variant="ghost" className="text-blue-600 p-0">
                  Thêm sản phẩm khuyến mãi của Shop {'>'} 
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Chọn hình thức thanh toán</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment}>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="cash" id="cash" />
                    <CreditCard className="w-5 h-5" />
                    <Label htmlFor="cash">Thanh toán tiền mặt</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="viettel" id="viettel" />
                    <Wallet className="w-5 h-5" />
                    <Label htmlFor="viettel">Viettel Money</Label>
                  </div>
                </div>
              </RadioGroup>

              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">Ưu đãi thanh toán thẻ</p>
              </div>

              {/* Discount Options */}
              <div className="mt-6">
                <h4 className="font-medium mb-3">Ưu đãi thanh toán</h4>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Freeship", desc: "Thể Shinhan Premium", bank: "Shinhan Bank" },
                    { label: "Freeship", desc: "Thể Shinhan Classic", bank: "Shinhan Bank" },
                    { label: "Giảm 30k", desc: "Đơn từ 300k", bank: "Shinhan Bank" },
                    { label: "Giảm 50k", desc: "Đơn từ 500k", bank: "Shinhan Bank" },
                    { label: "Giảm 50k", desc: "Đơn từ 500k", bank: "Shinhan Bank" },
                    { label: "Giảm 70k", desc: "Đơn từ 500k", bank: "Shinhan Bank" },
                    { label: "Giảm 100k", desc: "Đơn từ 700k", bank: "Shinhan Bank" },
                    { label: "Giảm 150k", desc: "Đơn từ 1 triệu", bank: "Shinhan Bank" },
                    { label: "Giảm 30k", desc: "Đơn từ 200k", bank: "Shinhan Bank" },
                    { label: "Giảm 50k", desc: "Đơn từ 300k", bank: "Shinhan Bank" },
                    { label: "Giảm 70k", desc: "Đơn từ 500k", bank: "Shinhan Bank" },
                    { label: "Freeship", desc: "TIKI360", bank: "VIP", highlight: true }
                  ].map((offer, index) => (
                    <div key={index} className={`p-3 border rounded-lg text-center cursor-pointer hover:border-blue-500 ${offer.highlight ? 'border-blue-500 bg-blue-50' : ''}`}>
                      <div className="text-blue-600 font-medium text-sm">{offer.label}</div>
                      <div className="text-xs text-gray-600 mt-1">{offer.desc}</div>
                      <div className="text-xs text-gray-500 mt-1">{offer.bank}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Order Summary */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Giao tới</span>
                <Button variant="ghost" className="text-blue-600 p-0 h-auto">Thay đổi</Button>
              </div>
              <div>
                <p className="font-medium">Vũ Anh Tú | 0942438693</p>
                <p className="text-sm text-gray-600">
                  số 17 Duy Tân, Phường Dịch Vọng, Quận Cầu Giấy, Hà Nội
                </p>
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <span className="text-sm">Tài Khuyến Mãi</span>
                <span className="text-sm text-gray-600">Có thể chọn 2</span>
              </div>
              <div className="flex gap-2 mt-2">
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  <Truck className="w-3 h-3 mr-1" />
                  Giảm 25K
                </Badge>
                <Button variant="outline" size="sm" className="text-blue-600">
                  Chọn hoặc nhập mã khác
                </Button>
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Đơn hàng</CardTitle>
              <p className="text-sm text-gray-600">1 sản phẩm. Xem thông tin {'>'}</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>Tạm tính</span>
                <span>168.000₫</span>
              </div>
              <div className="flex justify-between">
                <span>Phí vận chuyển</span>
                <span>25.000₫</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Giảm giá trực tiếp</span>
                <span>-58.000₫</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Giảm giá vận chuyển</span>
                <span>-25.000₫</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Tổng tiền thanh toán</span>
                <div className="text-right">
                  <div className="text-red-600">110.000 ₫</div>
                  <div className="text-sm text-gray-600">Tiết kiệm 84.000 ₫</div>
                </div>
              </div>
              <p className="text-xs text-gray-500">
                (Đã bao gồm thuế VAT nếu có)
              </p>
              <Button 
                className="w-full bg-red-500 hover:bg-red-600 text-white"
                onClick={onPlaceOrder}
              >
                Đặt hàng
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default BuyProduct;