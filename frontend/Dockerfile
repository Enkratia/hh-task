FROM node:20.11.1-alpine3.19 AS base

# Step 1. Rebuild the source code only when needed
FROM base AS builder

WORKDIR /app

COPY package*.json ./

#  --cpu=x64 --os=linux sharp === fixes npm linux bug
RUN npm ci --cache .npm --cpu=x64 --os=linux sharp

COPY src ./src
COPY public ./public
COPY next.config.mjs .
COPY postcss.config.js .
COPY tsconfig.json .

# Environment variables (that?) must be present at build time
ARG NODE_ENV
ENV NODE_ENV=production

ARG NEXT_TELEMETRY_DISABLED
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# Step 2. Production image, copy all the files and run next
FROM base AS runner

WORKDIR /app

USER root

# Automatically leverage output traces to reduce image size
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/postcss.config.js ./postcss.config.js
COPY --from=builder /app/public ./public

COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

# Environment variables (that?) must be present at build time
ARG NODE_ENV
ENV NODE_ENV=production

ARG NEXT_TELEMETRY_DISABLED
ENV NEXT_TELEMETRY_DISABLED=1

CMD ["node", "server.js"]

