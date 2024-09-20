<?php

namespace App\Models;

use App\Observers\RoleObserver;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;
use ElipZis\Cacheable\Models\Traits\Cacheable;
use Spatie\Permission\Models\Role as SpatieRole;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;

#[ObservedBy([RoleObserver::class])]
class Role extends SpatieRole
{
    use HasFactory, LogsActivity, Cacheable;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'roles';

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
        return [
            //How long should cache last in general?
            'ttl' => 300,
            //By what should cache entries be prefixed?
            'prefix' => 'rolecache',
            //What is the identifying, unique column name?
            'identifier' => 'id',
            //Do you need logging?
            'logging' => [
                'enabled' => !app()->environment('production'),
                'level' => 'debug',
            ],
        ];
    }
}
