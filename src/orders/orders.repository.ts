import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Orders } from 'src/entities/orders.entity';
import { OrderDetails } from 'src/entities/ordersdetails.entity';
import { Product } from 'src/entities/products.entity';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersRepository {
  //metodos para manejar las ordenes vendran aqui
  constructor(
    // inyecta el repositorio de la entidad Orders
    @InjectRepository(Orders)
    // crea una propiedad privada ordersRepository de tipo Repository<Orders>
    private ordersRepository: Repository<Orders>,

    // inyecta el repositorio de la entidad OrderDetails
    @InjectRepository(OrderDetails)
    // crea una propiedad privada orderDetailsRepository de tipo Repository<OrderDetails>
    private orderDetailsRepository: Repository<OrderDetails>,

    // inyecta el repositorio de la entidad Users
    @InjectRepository(Users)
    // crea una propiedad
    private usersRepository: Repository<Users>,

    // inyecta el repositorio de la entidad Products
    @InjectRepository(Product)
    // crea una propiedad privada productsRepository de tipo Repository<Product>
    private productsRepository: Repository<Product>,
  ) {}

  //metodo para agregar una orden
  async addOrder(userId: string, products: Partial<Product>[]) {
    // verifica si el usuario existe
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`Usuario con id: ${userId} no encontrado`);
    }
    // Validar que la orden no esté vacía
    if (!products || products.length === 0) {
      throw new BadRequestException(
        'La orden debe contener al menos un producto',
      );
    }
    // Validar productos duplicados
    const productIds = products.map((p) => p.id).filter(Boolean);
    const uniqueIds = new Set(productIds);
    if (productIds.length !== uniqueIds.size) {
      throw new BadRequestException(
        'No se pueden agregar productos duplicados en la misma orden',
      );
    }

    // crea una nueva orden
    const order = new Orders();
    order.date = new Date();
    order.user = user;

    const newOrder = await this.ordersRepository.save(order);

    // asocia los id con los productos y la orden creada
    const productsArray = await Promise.all(
      products.map(async (element) => {
        if (!element) {
          throw new NotFoundException(`Elemento no válido en la orden`);
        }
        const product = await this.productsRepository.findOneBy({
          id: element.id,
        });

        if (!product) {
          throw new NotFoundException(
            `Producto con id: ${element.id} no encontrado`,
          );
        }

        //actualiza el stock del producto
        await this.productsRepository.update(
          { id: element.id },
          { stock: product.stock - 1 },
        );
        return product;
      }),
    );
    // calcula el total de la orden
    const total = productsArray.reduce(
      (sum, product) => sum + Number(product.price),
      0,
    );
    //creamos "order details" y lo insetrtamos en la base de datos
    const orderDetail = new OrderDetails();
    orderDetail.price = Number(Number(total).toFixed(2));
    orderDetail.products = productsArray;
    orderDetail.order = newOrder;

    await this.orderDetailsRepository.save(orderDetail);

    return await this.ordersRepository.findOne({
      where: { id: newOrder.id },
      relations: {
        orderDetails: true,
      },
    });
  }

  async getOrder(id: string) {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: {
        orderDetails: {
          products: true,
        },
      },
    });
    if (!order) {
      throw new NotFoundException(`Orden con el id: ${id} no encontrada`);
    }

    return order;
  }
}
