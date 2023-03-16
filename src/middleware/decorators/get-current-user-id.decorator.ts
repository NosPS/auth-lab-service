import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetCurrentUserId = createParamDecorator(
    (data: string | undefined, context: ExecutionContext): string => {
        const request = context.switchToHttp().getRequest();
        if (data === null) return request.user;
        return request.user['sub'];
    }
)