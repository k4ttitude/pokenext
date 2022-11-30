# pnpm
FROM node:16-bullseye as pnpm
RUN npm install -g pnpm

# install deps
FROM pnpm AS deps

WORKDIR /opt/app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# build
FROM pnpm AS builder

ARG NEXT_PUBLIC_GRAPHQL_URI
ARG GRAPHQL_URI

ENV NODE_ENV=production
ENV NEXT_PUBLIC_GRAPHQL_URI=$NEXT_PUBLIC_GRAPHQL_URI
ENV GRAPHQL_URI=$GRAPHQL_URI
WORKDIR /opt/app
COPY . .
COPY --from=deps /opt/app/node_modules ./node_modules
RUN pnpm build
CMD ["pnpm", "start"]

# production
FROM pnpm AS runner

WORKDIR /opt/app
ENV NODE_ENV=production
COPY --from=builder /opt/app/next.config.js ./
COPY --from=builder /opt/app/public ./public
COPY --from=builder /opt/app/.next ./.next
COPY --from=builder /opt/app/node_modules ./node_modules
CMD ["node_modules/.bin/next", "start"]