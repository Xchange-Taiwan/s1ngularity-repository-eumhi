import { CalendarDays, Clock } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

import type { Reservation } from './types';

export function ReservationCard({
  item,
  actions,
}: {
  item: Reservation;
  actions?: React.ReactNode;
}) {
  return (
    <Card className="border-muted/40">
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-start gap-3 sm:gap-4">
          {/* Avatar */}
          <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
            {item.avatar ? (
              <AvatarImage src={item.avatar} alt={item.name} />
            ) : null}
            <AvatarFallback className="font-medium">
              {item.name
                .split(' ')
                .map((n) => n[0])
                .slice(0, 2)
                .join('')}
            </AvatarFallback>
          </Avatar>

          {/* Main content */}
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="truncate">
                <div className="truncate text-sm font-medium sm:text-base">
                  {item.name}
                </div>
                <div className="truncate text-xs text-muted-foreground sm:text-sm">
                  {item.roleLine}
                </div>
              </div>
              {/* Actions */}
              <div className="shrink-0">{actions}</div>
            </div>

            {/* Date & time */}
            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground sm:text-sm">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" aria-hidden />
                <span>{item.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" aria-hidden />
                <span>{item.time}</span>
              </div>
              {item.note ? (
                <Badge variant="secondary" className="rounded-full">
                  {item.note}
                </Badge>
              ) : null}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
