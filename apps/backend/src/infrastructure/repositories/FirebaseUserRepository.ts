import { db } from '../../config/firebase';
import { User } from '../../domain/entities/User';
import { IUserRepository } from '../../domain/repositories/IUserRepository';

export class FirebaseUserRepository implements IUserRepository {
	private collection = 'users';

	async findByEmail(email: string): Promise<User | null> {
		const snapshot = await db.collection(this.collection).where('email', '==', email).limit(1).get();

		if (snapshot.empty) return null;
		const doc = snapshot.docs[0];
		return { id: doc.id, ...doc.data() } as User;
	}

	async create(user: User): Promise<User> {
		const docRef = await db.collection(this.collection).add(user);
		return { ...user, id: docRef.id };
	}
}
