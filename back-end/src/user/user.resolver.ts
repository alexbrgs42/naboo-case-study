import { Query, Resolver, Mutation, Args, Context, ID } from '@nestjs/graphql';
import { User } from './user.schema';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { ContextWithJWTPayload } from 'src/auth/types/context';
import { UserService } from './user.service';
import { Activity } from 'src/activity/activity.schema';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [Activity])
  async getFavorites(
    @Context() context: ContextWithJWTPayload,
  ): Promise<Activity[]> {
    return this.userService.findFavorites(context.jwtPayload.id);
  }

  @Mutation(() => User)
  @UseGuards(AuthGuard)
  async updateFavorite(
    @Context() context: ContextWithJWTPayload,
    @Args('activityId', { type: () => ID }) activityId: string,
  ): Promise<User> {
    const user = await this.userService.getById(context.jwtPayload.id);
    if (user.favorites.includes(activityId)) {
      user.favorites = user.favorites.filter(
        (favorite) => favorite !== activityId,
      );
    } else {
      user.favorites.push(activityId);
    }
    await user.save();
    return user;
  }

  @Mutation(() => User)
  @UseGuards(AuthGuard)
  async reorderFavorites(
    @Context() context: ContextWithJWTPayload,
    @Args('favorites', { type: () => [String] }) favorites: string[],
  ) {
    const user = await this.userService.getById(context.jwtPayload.id);
    return this.userService.reorderFavorites(user.id, favorites);
  }
}
