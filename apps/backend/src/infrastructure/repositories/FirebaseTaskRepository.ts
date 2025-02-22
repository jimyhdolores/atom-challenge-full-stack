import { db } from '../../config/firebase';
import { Task } from '../../domain/entities/Task';
import { ITaskRepository } from '../../domain/repositories/ITaskRepository';

export class FirebaseTaskRepository implements ITaskRepository {
	private collection = 'tasks';

	private convertTimestamps(data: any): any {
		if (!data) return data;

		const result = { ...data };

		if (result.createdAt && '_seconds' in result.createdAt) {
			result.createdAt = new Date(result.createdAt._seconds * 1000);
		}

		if (result.updatedAt && '_seconds' in result.updatedAt) {
			result.updatedAt = new Date(result.updatedAt._seconds * 1000);
		}

		return result;
	}

	async findAll(userId: string): Promise<Task[]> {
		const snapshot = await db.collection(this.collection).where('userId', '==', userId).get();

		return snapshot.docs.map(
			(doc) =>
				this.convertTimestamps({
					id: doc.id,
					...doc.data(),
				}) as Task
		);
	}

	async findById(id: string): Promise<Task | null> {
		const doc = await db.collection(this.collection).doc(id).get();
		if (!doc.exists) return null;
		return this.convertTimestamps({ id: doc.id, ...doc.data() }) as Task;
	}

	async create(task: Task): Promise<Task> {
		const docRef = await db.collection(this.collection).add(task);
		return { ...task, id: docRef.id };
	}

	async update(id: string, task: Partial<Task>): Promise<Task> {
		await db.collection(this.collection).doc(id).update(task);
		const updated = await this.findById(id);
		if (!updated) throw new Error('Task not found');
		return updated;
	}

	async delete(id: string): Promise<void> {
		await db.collection(this.collection).doc(id).delete();
	}
}
