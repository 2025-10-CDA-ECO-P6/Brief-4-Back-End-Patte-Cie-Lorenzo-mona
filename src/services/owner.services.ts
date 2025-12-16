import { prisma } from "../repositories/prisma";

export async function getOwners(page?: number, limit?: number) {
    return prisma.owner.findMany({
        skip: page && limit ? (page - 1) * limit : undefined,
        take: page && limit ? limit : undefined,
        orderBy: {
        last_name: "asc",
        },
    });
}

export async function getOwnerById(id: string) {
    const owner = await prisma.owner.findUnique({
        where: { id_owner: id },
    });
    return owner;
}   

export async function createOwner(data: { last_name: string; first_name: string; phone: string; email: string; adress: string; }) {

    const newOwner = await prisma.owner.create({
        data: {
            first_name: data.first_name,
            last_name: data.last_name,
            phone: data.phone,
            email: data.email,
            adress: data.adress,
        },
    });
    return newOwner;
}

export async function updateOwner(id: string, data: { last_name?: string; first_name?: string; phone?: string; email?: string; adress?: string; }) {
    const updatedOwner = await prisma.owner.update({
        where: { id_owner: id },
        data: {
            ...data,
        },
    });
    return updatedOwner;
}

export async function deleteOwner(id: string) {
    await prisma.owner.delete({
        where: { id_owner: id },
    });
}   
