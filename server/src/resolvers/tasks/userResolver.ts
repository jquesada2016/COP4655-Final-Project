import {
  Arg,
  Args,
  ArgsType,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver
} from "type-graphql";
import { User, userModel } from "../../models/tasks/UserModel";
import jwt from "jsonwebtoken";

@ArgsType()
class UserArgsType {
  @Field()
  company: string;

  @Field()
  manager: boolean;

  @Field()
  idToken: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field((type) => User, { nullable: true })
  user?: User;

  @Field((type) => FieldError, { nullable: true })
  errors?: FieldError[];
}

@Resolver()
export class userResolver {
  @Query((returns) => UserResponse, { nullable: true })
  async getUserByEmail(@Arg("email") email: string) {
    const document = await userModel.findOne({ email });

    return { user: document };
  }

  @Mutation((returns) => UserResponse)
  async addNewUser(
    @Args()
    user: UserArgsType
  ) {
    const decodedJwt = jwt.decode(user.idToken);

    let document: User;
    try {
      document = await userModel.create({ email: decodedJwt.email, ...user });
    } catch (e: any) {
      console.log(e);
      return {
        errors: { field: "email", message: "This user already exists" }
      };
    }
    return { user: document } as UserResponse;
  }
}
