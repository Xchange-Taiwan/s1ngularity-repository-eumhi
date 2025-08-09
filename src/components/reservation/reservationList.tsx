import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { ReservationCard } from './reservationCard';
import type { Reservation } from './types';

export function ReservationList({
  items,
  variant,
}: {
  items: Reservation[];
  variant: 'upcoming' | 'pending-mentee' | 'pending-mentor' | 'history';
}) {
  return (
    <div className="space-y-3 sm:space-y-4">
      {items.map((it) => (
        <ReservationCard
          key={it.id}
          item={it}
          actions={
            variant === 'history' ? null : variant === 'pending-mentor' ? (
              <div className="flex items-center gap-2">
                <Button size="sm">Accept</Button>
                <Button size="sm" variant="outline">
                  Decline
                </Button>
              </div>
            ) : (
              <Button size="sm" variant="outline" className="text-destructive">
                Cancel
              </Button>
            )
          }
        />
      ))}

      {items.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="p-8 text-center text-muted-foreground">
            目前尚無資料
          </CardContent>
        </Card>
      )}
    </div>
  );
}
