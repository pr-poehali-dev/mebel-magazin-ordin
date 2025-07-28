import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  material: string;
  dimensions: string;
  color: string;
  inStock: boolean;
}

const Index = () => {
  const [compareList, setCompareList] = useState<number[]>([]);

  const products: Product[] = [
    {
      id: 1,
      name: 'Минималист Диван',
      price: 89900,
      image: '/img/7300f428-d073-405b-bd42-b66e68759234.jpg',
      category: 'Диваны',
      material: 'Ткань, сосна',
      dimensions: '200x90x80 см',
      color: 'Серый',
      inStock: true
    },
    {
      id: 2,
      name: 'Скандинавский Стол',
      price: 24900,
      image: '/img/7300f428-d073-405b-bd42-b66e68759234.jpg',
      category: 'Столы',
      material: 'Дуб массив',
      dimensions: '120x70x75 см',
      color: 'Натуральный',
      inStock: true
    },
    {
      id: 3,
      name: 'Элегантное Кресло',
      price: 34900,
      image: '/img/7300f428-d073-405b-bd42-b66e68759234.jpg',
      category: 'Кресла',
      material: 'Кожа, металл',
      dimensions: '70x80x90 см',
      color: 'Черный',
      inStock: false
    }
  ];

  const toggleCompare = (productId: number) => {
    setCompareList(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const compareProducts = products.filter(product => compareList.includes(product.id));

  return (
    <div className="min-h-screen bg-background font-open-sans">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src="/img/f0ee5b59-5ba1-4fba-ba6c-b0f4f0dfdd5d.jpg" alt="Ордин" className="h-10 w-auto" />
              <h1 className="text-2xl font-montserrat font-bold text-primary">ОРДИН</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-sm font-medium hover:text-primary transition-colors">Главная</a>
              <a href="#catalog" className="text-sm font-medium hover:text-primary transition-colors">Каталог</a>
              <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">О нас</a>
              <a href="#delivery" className="text-sm font-medium hover:text-primary transition-colors">Доставка</a>
              <a href="#contacts" className="text-sm font-medium hover:text-primary transition-colors">Контакты</a>
            </nav>
            <Button variant="outline" size="sm" className="md:hidden">
              <Icon name="Menu" size={20} />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="py-20 bg-gradient-to-br from-background to-secondary/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-6xl font-montserrat font-light text-primary mb-6">
            Мебель с характером
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Создаем пространства, которые отражают вашу индивидуальность. 
            Минималистичный дизайн, качественные материалы, внимание к деталям.
          </p>
          <Button size="lg" className="font-medium">
            Смотреть каталог
            <Icon name="ArrowRight" size={16} className="ml-2" />
          </Button>
        </div>
      </section>

      {/* Catalog Section */}
      <section id="catalog" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-montserrat font-semibold text-primary mb-4">Каталог</h3>
            <p className="text-muted-foreground">Выберите мебель для сравнения характеристик</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {products.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {!product.inStock && (
                      <Badge variant="secondary" className="absolute top-4 left-4">
                        Нет в наличии
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="font-montserrat text-lg mb-2">{product.name}</CardTitle>
                  <CardDescription className="mb-4">{product.category}</CardDescription>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-semibold text-primary">
                      {product.price.toLocaleString()} ₽
                    </span>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`compare-${product.id}`}
                        checked={compareList.includes(product.id)}
                        onCheckedChange={() => toggleCompare(product.id)}
                      />
                      <label htmlFor={`compare-${product.id}`} className="text-sm text-muted-foreground">
                        Сравнить
                      </label>
                    </div>
                  </div>
                  <Button 
                    className="w-full" 
                    disabled={!product.inStock}
                    variant={product.inStock ? "default" : "secondary"}
                  >
                    {product.inStock ? "В корзину" : "Под заказ"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Comparison Section */}
          {compareList.length > 0 && (
            <Card className="mb-12">
              <CardHeader>
                <CardTitle className="font-montserrat">Сравнение товаров ({compareList.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 font-medium">Характеристика</th>
                        {compareProducts.map(product => (
                          <th key={product.id} className="text-left py-3 font-medium">
                            {product.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 text-muted-foreground">Цена</td>
                        {compareProducts.map(product => (
                          <td key={product.id} className="py-3 font-semibold">
                            {product.price.toLocaleString()} ₽
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 text-muted-foreground">Материал</td>
                        {compareProducts.map(product => (
                          <td key={product.id} className="py-3">{product.material}</td>
                        ))}
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 text-muted-foreground">Размеры</td>
                        {compareProducts.map(product => (
                          <td key={product.id} className="py-3">{product.dimensions}</td>
                        ))}
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 text-muted-foreground">Цвет</td>
                        {compareProducts.map(product => (
                          <td key={product.id} className="py-3">{product.color}</td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-montserrat font-semibold text-primary mb-6">О нас</h3>
            <p className="text-lg text-muted-foreground mb-8">
              Ордин — это философия минимализма в мебели. Мы создаем предметы интерьера, 
              которые не просто функциональны, но и вдохновляют. Каждая деталь продумана 
              до мелочей, каждая линия имеет смысл.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <Icon name="Award" size={48} className="mx-auto mb-4 text-primary" />
                <h4 className="font-montserrat font-semibold mb-2">Качество</h4>
                <p className="text-muted-foreground text-sm">Только премиальные материалы и проверенные технологии</p>
              </div>
              <div className="text-center">
                <Icon name="Truck" size={48} className="mx-auto mb-4 text-primary" />
                <h4 className="font-montserrat font-semibold mb-2">Доставка</h4>
                <p className="text-muted-foreground text-sm">Бережная доставка и профессиональная сборка</p>
              </div>
              <div className="text-center">
                <Icon name="Users" size={48} className="mx-auto mb-4 text-primary" />
                <h4 className="font-montserrat font-semibold mb-2">Сервис</h4>
                <p className="text-muted-foreground text-sm">Персональный подход к каждому клиенту</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Section */}
      <section id="delivery" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-montserrat font-semibold text-primary mb-8 text-center">Доставка</h3>
            <Tabs defaultValue="moscow" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="moscow">Москва</TabsTrigger>
                <TabsTrigger value="regions">Регионы</TabsTrigger>
                <TabsTrigger value="assembly">Сборка</TabsTrigger>
              </TabsList>
              <TabsContent value="moscow" className="mt-8">
                <Card>
                  <CardContent className="p-6">
                    <h4 className="font-montserrat font-semibold mb-4">Доставка по Москве</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Бесплатная доставка при заказе от 50 000 ₽</li>
                      <li>• Доставка в течение 2-3 рабочих дней</li>
                      <li>• Подъем на этаж включен</li>
                      <li>• Возможность выбора времени доставки</li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="regions" className="mt-8">
                <Card>
                  <CardContent className="p-6">
                    <h4 className="font-montserrat font-semibold mb-4">Доставка в регионы</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Доставка транспортными компаниями</li>
                      <li>• Срок доставки 5-14 дней</li>
                      <li>• Упаковка для транспортировки включена</li>
                      <li>• Трекинг номер для отслеживания</li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="assembly" className="mt-8">
                <Card>
                  <CardContent className="p-6">
                    <h4 className="font-montserrat font-semibold mb-4">Сборка мебели</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Профессиональная сборка мастерами</li>
                      <li>• Стоимость от 2 000 ₽ за изделие</li>
                      <li>• Гарантия на сборку 1 год</li>
                      <li>• Уборка упаковочного материала</li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-montserrat font-semibold text-primary mb-8 text-center">Контакты</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-montserrat font-semibold mb-4">Шоурум</h4>
                  <div className="space-y-3 text-muted-foreground">
                    <div className="flex items-center space-x-3">
                      <Icon name="MapPin" size={20} />
                      <span>Москва, ул. Тверская, 15</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Icon name="Clock" size={20} />
                      <span>Пн-Вс: 10:00 - 21:00</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Icon name="Phone" size={20} />
                      <span>+7 (495) 123-45-67</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Icon name="Mail" size={20} />
                      <span>info@ordin.ru</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-montserrat font-semibold mb-4">Консультация</h4>
                  <p className="text-muted-foreground mb-4">
                    Получите персональную консультацию нашего дизайнера
                  </p>
                  <Button className="w-full">
                    Записаться на консультацию
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <h1 className="text-xl font-montserrat font-bold">ОРДИН</h1>
              <Separator orientation="vertical" className="h-6 bg-primary-foreground/20" />
              <span className="text-sm">Мебель с характером</span>
            </div>
            <div className="flex items-center space-x-6">
              <a href="#" className="hover:text-secondary transition-colors">
                <Icon name="Instagram" size={20} />
              </a>
              <a href="#" className="hover:text-secondary transition-colors">
                <Icon name="Facebook" size={20} />
              </a>
              <a href="tel:+74951234567" className="hover:text-secondary transition-colors">
                <Icon name="Phone" size={20} />
              </a>
            </div>
          </div>
          <Separator className="my-6 bg-primary-foreground/20" />
          <div className="text-center text-sm text-primary-foreground/80">
            © 2024 Ордин. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;