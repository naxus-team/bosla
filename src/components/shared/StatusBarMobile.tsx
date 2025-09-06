import { Icon } from "@iconify/react";

export function StatusBarMobile() {
  return (
    <div className="w-full h-7 bg-transparent text-white flex items-center justify-between px-2 text-xs">
      {}
      <div className="flex items-center gap-1">
        <Icon icon="mdi:signal-cellular-3" color="white" width={14} />
        <span>5G</span>
        <Icon icon="mdi:wifi" width={14} />
      </div>

      {}
      <div className="text-center">7:00</div>

      {}
      <div className="flex items-center gap-1">
        <Icon icon="bi:battery-full" width={16} />
        <span className="text-[10px]">100%</span>
      </div>
    </div>
  );
}
