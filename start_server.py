import os
import subprocess

def start_elysia_server():
    # 1. 대상 디렉토리 설정 (app 폴더)
    app_dir = os.path.join(os.getcwd(), 'app')
    
    # 2. 실행할 명령어 조합
    # /k 옵션은 명령 실행 후 창을 닫지 않고 유지합니다.
    # cd 명령어로 이동 후 bun run dev를 호출합니다.
    command = f'start cmd /k "cd /d {app_dir} && bun run dev"'
    
    print(f"🚀 새로운 CMD 창에서 서버를 시작합니다... (경로: {app_dir})")
    
    try:
        # Windows의 start 명령어를 통해 새 창 띄우기
        os.system(command)
        print("✅ 실행 명령이 전송되었습니다.")
    except Exception as e:
        print(f"❌ 오류 발생: {e}")

if __name__ == "__main__":
    start_elysia_server()
