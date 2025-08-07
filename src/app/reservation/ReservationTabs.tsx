'use client';

import { Tabs, TabsContent,TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ReservationTabs() {
  return (
    <Tabs defaultValue="upcoming" className="w-full">
      <TabsList className="bg-transparent flex flex-wrap justify-center gap-4">
        <TabsTrigger
          value="upcoming"
          className="data-[state=active]:bg-black data-[state=active]:text-white rounded-full px-4 py-2"
        >
          即將到來 <span className="ml-1 text-sm text-muted-foreground">4</span>
        </TabsTrigger>
        <TabsTrigger
          value="pending-mentee"
          className="data-[state=active]:bg-black data-[state=active]:text-white rounded-full px-4 py-2"
        >
          待確認（學生）
          <span className="ml-1 text-sm text-muted-foreground">2</span>
        </TabsTrigger>
        <TabsTrigger
          value="pending-mentor"
          className="data-[state=active]:bg-black data-[state=active]:text-white rounded-full px-4 py-2"
        >
          待確認（導師）
          <span className="ml-1 text-sm text-muted-foreground">1</span>
        </TabsTrigger>
        <TabsTrigger
          value="to-be-confirmed"
          className="data-[state=active]:bg-black data-[state=active]:text-white rounded-full px-4 py-2"
        >
          待確認中 <span className="ml-1 text-sm text-muted-foreground">0</span>
        </TabsTrigger>
        <TabsTrigger
          value="history"
          className="data-[state=active]:bg-black data-[state=active]:text-white rounded-full px-4 py-2"
        >
          歷史紀錄 <span className="ml-1 text-sm text-muted-foreground">0</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="upcoming" className="mt-6 space-y-4">
        <div className="rounded-xl border p-4">即將到來的預約 1</div>
        <div className="rounded-xl border p-4">即將到來的預約 2</div>
        <div className="rounded-xl border p-4">即將到來的預約 3</div>
        <div className="rounded-xl border p-4">即將到來的預約 4</div>
      </TabsContent>

      <TabsContent value="pending-mentee" className="mt-6 space-y-4">
        <div className="rounded-xl border p-4">學生待確認的預約 1</div>
        <div className="rounded-xl border p-4">學生待確認的預約 2</div>
      </TabsContent>

      <TabsContent value="pending-mentor" className="mt-6 space-y-4">
        <div className="rounded-xl border p-4">導師待確認的預約 1</div>
      </TabsContent>

      <TabsContent value="to-be-confirmed" className="mt-6 space-y-4">
        <div className="rounded-xl border p-4 text-muted-foreground">
          目前尚無資料
        </div>
      </TabsContent>

      <TabsContent value="history" className="mt-6 space-y-4">
        <div className="rounded-xl border p-4 text-muted-foreground">
          尚無歷史紀錄
        </div>
      </TabsContent>
    </Tabs>
  );
}
