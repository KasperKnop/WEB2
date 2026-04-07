import { expect, afterEach, beforeAll, afterAll } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from "@testing-library/jest-dom/matchers"
import { server } from '../src/mocks/node.js'

expect.extend(matchers)

afterEach(() => {
    cleanup()
})

// vitest.setup.js
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())