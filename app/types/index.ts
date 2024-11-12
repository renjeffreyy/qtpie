
    export interface user {
        id: string;
        name: string; 
        email:string;
        createdAt: Date;
        password: string;
        role: Role;
    }

    enum Role {
        user = "user",
        admin = "admin"
    }
