import { Arg, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class taskResolver {
  @Query((returns) => [String])
  getAllTasks() {
    return ["task 1", "task 2"];
  }
}
