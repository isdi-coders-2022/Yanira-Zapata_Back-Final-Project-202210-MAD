import mongoose from 'mongoose';
import { ProtoResourceI, ResourceModel } from '../entities/resources';
import { dbConnect } from '../services/dbconnect';
import { ResourcesRepository } from './resources.repo';

describe('Given a singleton instance of the class "ResourceRepository"', () => {
    const mockData = [
        {
            title: 'puzzle',
            subject: 'math',
            grade: 'second',
        },
        {
            title: 'jigsaw',
            subject: 'reading',
            grade: 'first',
        },
    ];
    const repository = ResourcesRepository.getInstance();

    let testIds: Array<string>;
    const setUpCollection = async () => {
        await dbConnect();
        await ResourceModel.deleteMany();
        await ResourceModel.insertMany(mockData);
        const data = await ResourceModel.find();

        return [data[0].id, data[1].id];
    };

    beforeAll(async () => {
        testIds = await setUpCollection();
    });
    describe('When it has been run GETALL and it has called Model.find', () => {
        test('Then it returns the resources in the collection', async () => {
            const spyModel = jest.spyOn(ResourceModel, 'find');
            const result = await repository.getAll();
            expect(spyModel).toHaveBeenCalled();
            expect(result[0].title).toEqual(mockData[0].title);
        });
    });
    describe('When POST is run and ResourceModel.create is called', () => {
        const spyModel = jest.spyOn(ResourceModel, 'create');
        test('Then, if the data is valid, it should return the resource', async () => {
            const newResource: Partial<ProtoResourceI> = {
                title: 'Puzzles',
                subject: 'math',
                grade: 'first',
            };
            const result = await repository.post(newResource);

            expect(spyModel).toHaveBeenCalled();
            expect(result.title).toBe(newResource.title);
        });
    });
    describe('When PATCH is run and ResourceModel.patch is called', () => {
        const spyModel = jest.spyOn(ResourceModel, 'findByIdAndUpdate');
        test('Then, if the data is valid, it should return the resource', async () => {
            const newTitle = 'ScapeRoom';
            const result = await repository.patch(testIds[0], {
                title: newTitle,
            });
            expect(spyModel).toHaveBeenCalled();
            expect(result.title).toEqual(newTitle);
        });
    });
    describe('When DELETE is run and ResourceModel.delete is called', () => {
        const spyModel = jest.spyOn(ResourceModel, 'findByIdAndDelete');
        test('Then, if the data is valid, it should return the id', async () => {
            const result = await repository.delete(testIds[1]);
            expect(spyModel).toHaveBeenCalled();
            expect(result).toEqual(testIds[1]);
        });
    });
    describe('When GET is run and ResourceModel.findById is called', () => {
        test('Then, if the data is valid, it should return the resource', async () => {
            const result = await repository.get(testIds[0]);
            expect(result.title).toEqual('ScapeRoom');
        });
    });
    describe('When FIND is run and ResourceModel.findOne is called', () => {
        test('Then, if the data is valid, it should return the resource', async () => {
            const result = await repository.query('title', 'ScapeRoom');
            expect(result[0].title).toEqual('ScapeRoom');
        });
    });
    afterAll(() => {
        mongoose.disconnect();
    });
});
