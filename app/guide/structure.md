/src
├── index.ts
├── modules/
│   ├── user/                 # '사용자'와 관련된 모든 것
│   │   ├── user.controller.ts
│   │   ├── user.service.ts
│   │   └── user.model.ts
│   ├── auth/                 # '인증'과 관련된 모든 것
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   └── auth.model.ts
│   └── post/                 # '게시글'과 관련된 모든 것
│       ├── post.controller.ts
│       └── post.service.ts
└── common/                   # 전역 공통 유틸리티/플러그인
    └── database.ts