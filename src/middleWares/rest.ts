/**
 * @author: forguo
 * @description: rest
 */
import { Context, Next } from 'koa'
import { IResponse } from '@/types/response'
import logUtil from '@/libs/log4'
import dayjs from 'dayjs'

// 处理请求成功方法
const render = (context: Context) => {
    // 返回一个 function
    return ({ code = 200, message = 'success', data }: IResponse) => {
        context.response.type = 'application/json'
        const response: IResponse = {
            code,
            message,
            success: code.toString().startsWith('2'),
            serverTime: Date.now()
        }
        if (data) {
            response.data = data
        }
        code === 200
            ? logUtil.logSuccess(context, response, dayjs().format('YYYY-MM-DD HH:mm:ss'))
            : logUtil.logError(context, response, dayjs().format('YYYY-MM-DD HH:mm:ss'))
        context.body = response
    }
}

// 处理请求失败方法
const renderFail = (context: Context) => {
    // 返回一个 function
    return ({ code = -1, message = 'error', data }: IResponse) => {
        context.success({
            code,
            message,
            data
        })
    }
}

export default () => {
    return async (context: Context, next: Next) => {
        // 返回一个 function，在 controller 中执行
        context.success = render(context)
        context.fail = renderFail(context)
        await next()
    }
}
