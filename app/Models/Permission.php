<?php

namespace App\Models;

use Spatie\Activitylog\LogOptions;
use App\Observers\PermissionObserver;
use Spatie\Activitylog\Traits\LogsActivity;
use ElipZis\Cacheable\Models\Traits\Cacheable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Spatie\Permission\Models\Permission as SpatiePermission;

#[ObservedBy([PermissionObserver::class])]
class Permission extends SpatiePermission
{
    use HasFactory, LogsActivity, Cacheable;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'permissions';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'id';

    /**
     * The attributes that should be searchable.
     *
     * @var array<int, string>
     */
    protected $searchable = [
        'id',
        'name',
        'guard_name',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    public function getSearchableFields(): array
    {
        return $this->searchable;
    }

    /**
     * Get the route key for the model.
     *
     * @return string
     */
    public function getRouteKeyName()
    {
        return 'uuid';
    }

    /**
     * The spatie log that setting log option.
     *
     * @var bool
     */
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly(['name', 'guard_name'])
            ->useLogName('model')
            ->setDescriptionForEvent(fn (string $eventName) => trans('model.activity.description', ['model' => $this->table, 'event' => $eventName]))
            ->dontSubmitEmptyLogs();
    }

    /**
     * The cacheable properties that should be cached.
     *
     * @return array
     */
    public function getCacheableProperties(): array {
        $overrided = [
            'prefix' => 'permissioncache',
        ];

        return array_merge(config('cacheable'), $overrided);
    }
}
