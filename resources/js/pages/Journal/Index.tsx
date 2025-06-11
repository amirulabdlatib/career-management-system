
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Megaphone } from 'lucide-react';

import { PageProps as InertiaPageProps } from '@inertiajs/core';

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/products',
    },
];

interface Product {
    id: number; // Assuming products have an id
    name: string;       // Assuming products have a name
    price: number;      // Assuming products have a price
    description: string; // Assuming products have a description
}


interface PageProps extends InertiaPageProps {
    flash?: {
        message?: string;
    },
    products: Product[]; // Assuming products is an array of Product objects
    // You can add more properties as needed
}

export default function Index() {

    const { products, flash } = usePage<PageProps>().props;

    const { processing, delete: destroy } = useForm();



    const handleDelete = (id: number, name: string) => {
        if (confirm(`Do you want to delete - ${id}. ${name}?`)) {
            destroy(route('products.destroy', id)); 
        }
    };


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className='m-4'>
                <Link href={route('products.create')}><Button>Create a Product</Button></Link>
            </div>
            <div className='m-4'>
                <div>
                    {flash?.message && (
                        <Alert>
                            <Megaphone className="h-4 w-4 text-blue-500" />
                            <AlertTitle>Notification!</AlertTitle>
                            <AlertDescription>{flash.message}</AlertDescription>
                        </Alert>
                    )}
                </div>
            </div>


            {products.length === 0 ? (
                <div className="m-4 text-center text-gray-500">No products found.</div>
            ) : (
                <div className="m-4">
                    {<Table>
                        <TableCaption>A list of your recent products.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-center">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell className="font-medium">{product.id}</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>RM {product.price.toFixed(2)}</TableCell>
                                    <TableCell>{product.description}</TableCell>
                                    <TableCell className="text-center space-x-2">
                                        <Link href={route('products.edit',product.id)}><Button className="bg-slate-600 hover:bg-slate-700">Edit</Button></Link>
                                        <Button disabled={processing} onClick={() => handleDelete(product.id, product.name)} className="bg-red-500 hover:bg-red-700">Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>}
                </div>
            )}
        </AppLayout>
    );
}
