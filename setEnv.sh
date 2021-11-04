mkdir env
echo "export const environment = { sheet_api_key : '$1' }"  > env/env.ts
- run: sh setEnvironment.sh ${{ secrets.SHEET_API_KEY }}
