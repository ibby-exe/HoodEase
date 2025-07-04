"use client";

import { useState } from 'react';
import { useStore } from '@/store/useStore';
import ImageCarousel from '@/components/ImageCarousel';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Share2, Star } from 'lucide-react';
import { toast } from 'sonner';

export default function ProductDetailsClient({ product, relatedProducts }: { product: any, relatedProducts: any[] }) {
  const { addToCart } = useStore();
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      toast.error('Please select both color and size');
      return;
    }
    addToCart(product, selectedColor, selectedSize, quantity);
    toast.success('Added to cart!');
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-full aspect-square relative rounded-lg overflow-hidden border bg-white flex items-center justify-center">
              <img src={product.image} alt={product.name} className="object-cover w-full h-full" />
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <Badge variant="outline" className="mb-2 capitalize">
                {product.category}
              </Badge>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-600">(24 reviews)</span>
              </div>
              <p className="text-3xl font-bold text-brand-600">PKR {product.price.toLocaleString('en-PK')}</p>
            </div>

            <div>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Color Selection */}
            <div>
              <Label className="text-base font-medium mb-3 block">
                Color: {selectedColor && <span className="text-brand-600">{selectedColor}</span>}
              </Label>
              <RadioGroup value={selectedColor} onValueChange={setSelectedColor}>
                <div className="flex gap-3">
                  {product.colors.map((color: string) => (
                    <div key={color} className="flex items-center space-x-2">
                      <RadioGroupItem value={color} id={color} className="sr-only" />
                      <Label
                        htmlFor={color}
                        className={`w-8 h-8 rounded-full border-2 cursor-pointer transition-all ${
                          selectedColor === color ? 'border-brand-500 ring-2 ring-brand-200' : 'border-gray-300'
                        }`}
                        style={{ backgroundColor: color.toLowerCase() }}
                        title={color}
                      />
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {/* Size Selection */}
            <div>
              <Label className="text-base font-medium mb-3 block">
                Size: {selectedSize && <span className="text-brand-600">{selectedSize}</span>}
              </Label>
              <RadioGroup value={selectedSize} onValueChange={setSelectedSize}>
                <div className="flex gap-2">
                  {product.sizes.map((size: string) => (
                    <div key={size} className="flex items-center space-x-2">
                      <RadioGroupItem value={size} id={size} className="sr-only" />
                      <Label
                        htmlFor={size}
                        className={`px-4 py-2 border rounded-md cursor-pointer transition-all ${
                          selectedSize === size
                            ? 'border-brand-500 bg-brand-50 text-brand-700'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {size}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {/* Quantity */}
            <div>
              <Label className="text-base font-medium mb-3 block">Quantity</Label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="bg-white"
                >
                  -
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  className="bg-white"
                >
                  +
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button
                variant="default"
                size="lg"
                className="w-full bg-black hover:bg-gray-800 text-white"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <div className="flex gap-3">
                <Button variant="outline" size="lg" className="flex-1 bg-brand-600 text-black hover:bg-brand-700">
                  <Heart className="mr-2 h-4 w-4" />
                  Wishlist
                </Button>
                <Button variant="outline" size="lg" className="flex-1 bg-brand-600 text-black hover:bg-brand-700">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>

            {/* Product Features */}
            <div className="border-t pt-6">
              <h3 className="font-semibold mb-3">Features</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Premium cotton blend fabric</li>
                <li>• Machine washable</li>
                <li>• Comfortable regular fit</li>
                <li>• Kangaroo pocket</li>
                <li>• Adjustable drawstring hood</li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-8">Similar Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
} 